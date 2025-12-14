import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // try to parse JSON safely
      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        console.error("Not JSON response:", err);
      }

      if (response.ok) {
        setStatus("✅ " + (data?.message || "Your message has been sent successfully!"));
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("⚠️ " + (data?.message || "Something went wrong. Please try again."));
      }
    } catch (error) {
      setStatus("❌ Error: " + error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "120px auto 50px auto",
      padding: "25px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      position: "relative",
      zIndex: 1,
    },
    heading: { marginBottom: "10px", fontSize: "1.8rem", color: "#333" },
    subText: { fontSize: "0.8rem", color: "#555", marginBottom: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "12px" },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      minHeight: "80px",
      resize: "vertical",
      fontSize: "14px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      border: "none",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
    status: { marginTop: "10px", fontWeight: "bold", color: "#333", fontSize: "14px" },
    map: { marginTop: "15px", borderRadius: "8px", width: "100%", height: "200px", border: 0 },
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.heading}>Contact Us</h2>
        <p className="contact-subtext" style={styles.subText}>
          Have questions? Fill out the form below or reach us at:<br />
          <strong>Email:</strong> support@kiitgo.com | <strong>Phone:</strong> +91 98765 43210
        </p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>

        {status && <p style={styles.status}>{status}</p>}

        <h3 style={{ marginTop: "20px", fontSize: "1.2rem", color: "#333" }}>
          📍 Our Location
        </h3>
        <iframe
          title="KIIT Campus"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.462073709154!2d85.81735781544607!3d20.355112786361075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19091c6f87e5b1%3A0x5a7b0d5d82bb3e7e!2sKIIT%20University!5e0!3m2!1sen!2sin!4v1694069730269!5m2!1sen!2sin"
          style={styles.map}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}

export default Contact;
