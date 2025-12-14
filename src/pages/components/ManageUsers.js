import { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  // ✅ Fetch users from backend
  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data.filter((u) => u.role !== "admin"));
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Delete user
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUser.name, email: newUser.email, password: newUser.password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User added successfully!");
        setNewUser({ name: "", email: "", password: "" });
        fetchUsers(); // refresh users list
      } else {
        setMessage(data.message || "❌ Failed to add user.");
      }
    } catch (err) {
      console.error("Add user error:", err);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="users-container">
      <h2>👥 User Management</h2>

      {/* Add User Form */}
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>
      {message && <p className="message">{message}</p>}

      {/* Users Table */}
      {users.length === 0 ? (
        <p className="no-users">No users registered yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>
                    <a href={`mailto:${u.email}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
                      {u.email}
                    </a>
                  </td>
                  <td>{u.role}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(u._id)}>
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
        .users-container { width: 100%; max-width: 100vw; padding: 20px; background: #fff; box-sizing: border-box; }
        .add-user-form { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .add-user-form input { padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; flex: 1 1 200px; }
        .add-user-form button { padding: 8px 14px; border-radius: 6px; border: none; background-color: #16a34a; color: white; cursor: pointer; }
        .add-user-form button:hover { background-color: #15803d; }
        .message { margin: 10px 0; font-weight: bold; }

        .users-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .users-table th, .users-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .users-table thead { background: #f3f4f6; }
        .delete-btn { background-color: #dc2626; color: #fff; padding: 6px 12px; border: none; border-radius: 5px; cursor: pointer; }
        .delete-btn:hover { background-color: #b91c1c; }
        .table-wrapper { width: 100%; overflow-x: auto; }
        .no-users { margin-top: 20px; padding: 12px; background: #f8d7da; color: #721c24; border-radius: 6px; }
      `}</style>
    </div>
  );
}

export default ManageUsers;
