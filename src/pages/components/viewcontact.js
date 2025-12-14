import { useEffect, useState } from "react";

function ViewContacts() {
  const [contacts, setContacts] = useState([]);

  // ✅ Fetch contacts from backend API
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/contact");
      const data = await res.json();
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error("Invalid contacts response:", data);
        setContacts([]);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Delete contact from DB
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/contact/${id}`, {
        method: "DELETE",
      });
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="contacts-container">
      <h2>📩 All Contact Messages</h2>

      {contacts.length === 0 ? (
        <p className="no-contacts">No messages submitted yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.message}</td>
                  <td>
                    {new Date(c.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete 🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
      .contacts-container { width: 100%; max-width: 100vw; padding: 20px; background: #ffffff; box-sizing: border-box; } 
      .contacts-table { width: 100%; border-collapse: collapse; margin-top: 15px; } 
      .contacts-table th, .contacts-table td { border: 1px solid #ddd; padding: 8px; text-align: left; } 
      .contacts-table thead { background: #f3f4f6; } 
      .delete-btn { padding: 6px 12px; border: none; border-radius: 5px; cursor: pointer; background-color: #dc2626; color: #fff; } 
      .delete-btn:hover { background-color: #b91c1c; } 
      .table-wrapper { width: 100%; overflow-x: auto; } 
      @media (max-width: 768px) { 
        .contacts-table { min-width: 600px; } 
        .contacts-table th, .contacts-table td { padding: 6px; font-size: 14px; } 
        .delete-btn { padding: 6px 10px; } 
      } 
      .no-contacts { margin-top: 20px; padding: 12px; background: #f8d7da; color: #721c24; border-radius: 6px; }
      `}</style>
    </div>
  );
}

export default ViewContacts;
