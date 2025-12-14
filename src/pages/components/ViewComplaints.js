import { useEffect, useState } from "react";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);

  //  Fetch complaints from backend API 
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/complaints");
      const data = await res.json();
      if (Array.isArray(data)) {
        setComplaints(data);
      } else {
        console.error("Invalid complaints response:", data);
        setComplaints([]);
      }
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Delete complaint from DB
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/complaints/${id}`, {
        method: "DELETE",
      });
      setComplaints((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Mark complaint as resolved in DB
  const handleResolve = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/complaints/${id}/resolve`, {
        method: "PUT",
      });
      const updatedComplaint = await res.json();

      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? updatedComplaint : c))
      );
    } catch (err) {
      console.error("Resolve error:", err);
    }
  };

  return (
    <div className="complaints-container">
      <h2>📋 All Complaints</h2>

      {complaints.length === 0 ? (
        <p className="no-complaints">No complaints submitted yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.roll}</td>
                  <td>{c.issue}</td>
                  <td>
                    {new Date(c.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {c.status === "resolved" ? (
                      <span className="status-resolved">Resolved ✅</span>
                    ) : (
                      <span className="status-pending">Pending ⏳</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    {c.status !== "resolved" && (
                      <button
                        className="resolve-btn"
                        onClick={() => handleResolve(c._id)}
                      >
                        Resolve 
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style>{`
      .complaints-container { width: 100%; max-width: 100vw; padding: 20px; background: #ffffff; box-sizing: border-box; } 
      .complaints-table { width: 100%; border-collapse: collapse; margin-top: 15px; } 
      .complaints-table th, .complaints-table td { border: 1px solid #ddd; padding: 8px; text-align: left; } 
      .complaints-table thead { background: #f3f4f6; } 
      .status-resolved { color: green; font-weight: bold; } 
      .status-pending { color: red; font-weight: bold; } 
      .delete-btn, .resolve-btn { margin-right: 6px; padding: 6px 12px; border: none; border-radius: 5px; cursor: pointer; color: #fff; } 
      .delete-btn { background-color: #dc2626; } 
      .delete-btn:hover { background-color: #b91c1c; } 
      .resolve-btn { background-color: #16a34a; } 
      .resolve-btn:hover { background-color: #15803d; } 
      .table-wrapper { width: 100%; overflow-x: auto; } 
      @media (max-width: 768px) { .complaints-table { min-width: 650px; } .complaints-table th, .complaints-table td { padding: 6px; font-size: 14px; } .delete-btn, .resolve-btn { padding: 6px 10px; } } 
      .no-complaints { margin-top: 20px; padding: 12px; background: #f8d7da; color: #721c24; border-radius: 6px; }
      `}</style>
    </div>
  );
}

export default ViewComplaints;
