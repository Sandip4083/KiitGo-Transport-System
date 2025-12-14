import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/adminnavbar"; // your top navbar
import ViewComplaints from "./components/ViewComplaints";
import ManageUsers from "./components/ManageUsers";
import ViewContact from "./components/viewcontact";// ✅ exact casing



function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("viewComplaints");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));
    if (!loggedInAdmin || loggedInAdmin.role !== "admin") {
      alert("Access Denied! Admins only.");
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <style>{`
      
        /* ===== Layout ===== */
        .admin-container {
          display: flex;
        }

        .sidebar {
          width: 220px;
          background-color: #1e293b;
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          position: fixed;
          top: 50px; /* height of navbar */
          bottom: 0;
          left: 0;
          transition: transform 0.3s ease;
        }

        .sidebar h2 {
          margin-bottom: 20px;
          border-bottom: 1px solid #475569;
          padding-bottom: 10px;
        }

        .sidebar button {
          padding: 10px;
          background: transparent;
          border: none;
          color: white;
          text-align: left;
          cursor: pointer;
          border-radius: 6px;
          font-size: 15px;
        }
        .sidebar button.active {
          background: #334155;
        }
        .sidebar button:hover {
          background: #475569;
        }

        .main-content {
          margin-left: 220px;
          margin-top: 50px;
          width: calc(100vw - 220px);
          height: calc(100vh - 50px);
          background: white;
          overflow-y: auto;
          padding: 20px;
          transition: margin-left 0.3s ease;
        }

        /* ===== Hamburger Styles ===== */
        .hamburger {
          display: none;
          position: absolute;
          top: 12px;
          right: 20px;            /* ✅ moved to right side */
          flex-direction: column;
          justify-content: center;
          width: 28px;
          height: 22px;
          gap: 5px;
          cursor: pointer;
          z-index: 1500;
        }
        .hamburger span {
          display: block;
          height: 3px;
          background: #ffffff;     /* ✅ match navbar text color */
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translateY(8px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translateY(-8px);
        }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
            z-index: 1200;
          }
          .main-content {
            margin-left: 0;
            width: 100%;
          }
          .hamburger {
            display: flex;  /* show only on small screens */
          }
             .navbar-title {
            font-size: 10px;
          }
          .navbar-subtitle {
            font-size: 5px;
          }
        }
      `}</style>

      <div className="admin-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <h2>Admin Panel</h2>
          <button
            onClick={() => {
              setActivePage("manageUsers");
              setSidebarOpen(false);
            }}
            className={activePage === "manageUsers" ? "active" : ""}
          >
            User Management
          </button>

          <button
            onClick={() => {
              setActivePage("viewComplaints");
              setSidebarOpen(false);
            }}
            className={activePage === "viewComplaints" ? "active" : ""}
          >
            View Complaints
          </button>

<button
  onClick={() => {
    setActivePage("viewContact"); // ✅ camelCase
    setSidebarOpen(false);
  }}
  className={activePage === "viewContact" ? "active" : ""}
>
  View Contact
</button>


          <button onClick={handleLogout}>Logout</button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Top Navbar with Hamburger on the right */}
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
            <Navbar />
            <div
              className={`hamburger ${sidebarOpen ? "open" : ""}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Page Content */}
          <div style={{ marginTop: "20px" }}>
            {activePage === "viewComplaints" && <ViewComplaints />}
            {activePage === "manageUsers" && <ManageUsers />}
            {activePage === "viewContact" && <ViewContact />}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
