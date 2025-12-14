import { Link, useNavigate } from "react-router-dom";
import kiitgoLogo from "../assets/KIITGO_logo.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or tokens if you use them
    localStorage.removeItem("LoggedInUser"); 
    // Or clear all if needed: localStorage.clear();

    // Redirect to login page
    navigate("/login"); //  use lowercase (React Router is case-sensitive)
  };

  return (
    <>
      <style>
        {`
           body {
      margin: 0;
      padding: 0;
    }

    .navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;  /*  all items grouped together */
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo {
width:64px;
  height: 50px; 
  margin-right: 10px; /* ✅ adds space between logo & nav */
}

.navbar {
  display: flex;              /* space between links */
  justify-content: flex-end; 
  flex-grow: 1;         
   font-family: 'Segoe UI', Arial, sans-serif;
}


.navbar a {
  text-decoration: none;
  color: white;
  padding: 8px 20px;
  border-radius: 4px;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: 500;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}
.navbar-box {
  display: flex;
  align-items: center;   /* keep logo & text aligned */
  margin-left: 10px;
}

.navbar-box {
  display: flex;
  flex-direction: column;  /* Stack title + subtitle vertically */
  align-items: flex-start; /* Align text to left instead of center */
  margin-left: 10px;
  line-height: 1.3; /* Tighter spacing */
   font-family: 'Segoe UI', Arial, sans-serif;
}

.navbar-title {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff; /* White */
}

.navbar-subtitle {
  font-size: 12px;
  color: #d0d0d0; /* Softer white/grey */
  margin: 0;
  text-align: center;
}

  /* Responsive */
        @media (max-width: 768px) {
          .navbar {
            display: none; /* Hide desktop menu */
          }
          .hamburger {
            display: flex;
          }
            .navbar-box{
            position:absolute;
            left:40px;
            top:1px
            }
          .navbar-title {
            font-size: 10px;
          }
          .navbar-subtitle {
            font-size: 5px;
          }
        }
        `}
      </style>

      <header className="navbar-container">
        <img src={kiitgoLogo} alt="KIITGO Logo" className="logo" />
          <div class="navbar-box">
    <div class="navbar-text">
      <span class="navbar-title">Kalinga Institute of Industrial Technology</span>
      <p class="navbar-subtitle">Deemed to be University U/S 3 of UGC Act, 1956</p>
    </div>
    </div>
        <nav className="navbar">
          {/*<Link to="/dashboard/view-complaints">View Complaints</Link>
          <a onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>*/}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
