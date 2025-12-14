import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.role !== "user") {
      alert(" Access Denied! Users only.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1> User Dashboard</h1>
      <p>Welcome, {JSON.parse(localStorage.getItem("loggedInUser"))?.username}!</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;
