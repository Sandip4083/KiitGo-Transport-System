import { useState, useEffect } from "react";

function Complain() {
  const [complain, setComplain] = useState({ name: "", roll: "", issue: "" });
  const [submitted, setSubmitted] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Get logged-in user info
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Handle input changes
  const handleChange = (e) => {
    setComplain({ ...complain, [e.target.name]: e.target.value });
  };

  // Submit complaint to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    try {
      const res = await fetch("http://localhost:5000/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...complain,
          userId: loggedInUser?.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setComplain({ name: "", roll: "", issue: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert(data.message || "Failed to submit complaint");
      }
    } catch (err) {
      console.error("Complaint submission error:", err);
      alert("Server error. Try again later.");
    }
  };

  // Poll only new resolved complaints every 5 seconds
  useEffect(() => {
    if (!loggedInUser) return;

    const fetchResolvedNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/complaints");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          // Only unresolved notifications for this user
          const newResolved = data.filter(
            (c) =>
              c.status === "resolved" &&
              c.userId === loggedInUser.id &&
              !c.notified
          );

          if (newResolved.length > 0) {
            const notes = newResolved.map(
              (c) => `✅ Your complaint "${c.issue}" has been resolved.`
            );

            // Add new notifications
            setNotifications((prev) => [...prev, ...notes]);

            // Mark complaints as notified in backend
            newResolved.forEach(async (c) => {
              await fetch(`http://localhost:5000/complaints/${c._id}/notify`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notified: true }),
              });
            });
          }
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    // Initial fetch
    fetchResolvedNotifications();

    // Poll every 5 seconds
    const interval = setInterval(fetchResolvedNotifications, 5000);

    return () => clearInterval(interval);
  }, [loggedInUser]);

  // Styles
  const styles = {
    pageWrapper: { display: "flex", flexDirection: "column", minHeight: "93.1vh", margin: 0 },
    contentWrapper: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" },
    container: {
      width: "100%",
      maxWidth: "600px",
      padding: "25px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    form: { display: "flex", flexDirection: "column", gap: "15px" },
    input: { padding: "12px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px" },
    textarea: { padding: "12px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "120px", resize: "vertical", fontSize: "16px" },
    button: { padding: "12px", backgroundColor: "#dc3545", border: "none", color: "white", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" },
    success: { marginTop: "15px", padding: "12px", background: "#d4edda", color: "#155724", borderRadius: "6px" },
    notifyBox: { marginTop: "15px", padding: "12px", background: "#cce5ff", color: "#004085", borderRadius: "6px" },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        <div style={styles.container}>
          <h2>Complain Box</h2>
          <p>If you face any issues regarding the bus service, please fill this form.</p>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={complain.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="roll"
              placeholder="Your Roll Number"
              value={complain.roll}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <textarea
              name="issue"
              placeholder="Describe your issue..."
              value={complain.issue}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
            <button type="submit" style={styles.button}>Submit Complaint</button>
          </form>

          {submitted && <div style={styles.success}>✅ Your complaint has been saved!</div>}

          {notifications.map((note, i) => (
            <div key={i} style={styles.notifyBox}>{note}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Complain;
