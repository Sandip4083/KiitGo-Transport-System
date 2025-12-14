import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import kiitgoLogo from "../assets/KIITGO_logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
    setMenuOpen(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("loggedInUser");
    setShowModal(false);
    navigate("/login");
  };

  const handleCancel = () => setShowModal(false);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(0, 0, 0, 0.6);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          padding: 0 15px;
        }
        .logo {
          width: 64px;
          height: 50px;
          margin-right: 10px;
        }
        .navbar-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 10px;
          line-height: 1.3;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        .navbar-title {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
        }
        .navbar-subtitle {
          font-size: 12px;
          color: #d0d0d0;
          margin: 0;
          text-align: center;
        }

        /* Desktop Menu */
        .navbar {
          display: flex;
          justify-content: flex-end;
          flex-grow: 1;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        .navbar a {
          text-decoration: none;
          color: white;
          padding: 8px 20px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 16px;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
        }
        .navbar a:hover {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
        }

        /* ===== Hamburger Styles ===== */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          cursor: pointer;
          width: 28px;
          height: 22px;
          gap: 5px;
        }
        .hamburger span {
          display: block;
          height: 3px;
          background: white;
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

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: ${menuOpen ? "0" : "-220px"};
          width: 220px;
          height: 100vh;
          background: rgba(0,0,0,0.9);
          display: flex;
          flex-direction: column;
          padding-top: 70px;
          transition: left 0.3s ease;
          z-index: 1500;
        }
        .mobile-menu a {
          text-decoration: none;
          color: white;
          padding: 12px 20px;
          font-size: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-menu a:hover {
          background: rgba(255,255,255,0.1);
        }

        /* ===== Modal Styles ===== */
        .logout-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .logout-modal {
          background: #fff;
          padding: 2rem 3rem;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 400px;
          width: 90%;
          font-family: 'Segoe UI', sans-serif;
        }
        .logout-modal h2 {
          margin-bottom: 0.5rem;
          color: #2a2a72;
        }
        .logout-modal p {
          margin-bottom: 1.5rem;
          color: #444;
        }
        .logout-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn {
          padding: 0.6rem 1.2rem;
          font-size: 1rem;
          border: none;
          border-radius: 0.4rem;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.1s ease;
        }
        .btn-primary {
          background-color: #2a2a72;
          color: #fff;
        }
        .btn-primary:hover {
          background-color: #1e1e5a;
          transform: translateY(-2px);
        }
        .btn-secondary {
          background-color: #e0e0e0;
          color: #333;
        }
        .btn-secondary:hover {
          background-color: #cacaca;
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar {
            display: none; /* Hide desktop menu */
          }
          .hamburger {
            display: flex;
          }
            .logo{
        
            
            }
            .navbar-box{
            position:absolute;
            left:60px;
            top:9px
            }
          .navbar-title {
            font-size: 10px;
          }
          .navbar-subtitle {
            font-size: 5px;
          }
        }
      `}</style>

      <header className="navbar-container">
        <img src={kiitgoLogo} alt="KIITGO Logo" className="logo" />

        <div className="navbar-box">
          <span className="navbar-title">Kalinga Institute of Industrial Technology</span>
          <p className="navbar-subtitle">Deemed to be University U/S 3 of UGC Act, 1956</p>
        </div>

        {/* Desktop Links */}
        <nav className="navbar">
          <Link to="/dashboard/home">Home</Link>
          <Link to="/dashboard/About">About</Link>
          <Link to="/dashboard/contact">Contact</Link>
          <Link to="/dashboard/complain">Complain</Link>
          <a onClick={handleLogoutClick} style={{ cursor: "pointer" }}>Logout</a>
        </nav>

        {/* Hamburger Button */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="mobile-menu" style={{ left: menuOpen ? "0" : "-220px" }}>
        <Link to="/dashboard/home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/dashboard/About" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/dashboard/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/dashboard/complain" onClick={() => setMenuOpen(false)}>Complain</Link>
        <a onClick={handleLogoutClick}>Logout</a>
      </div>

      {showModal && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h2>Log Out</h2>
            <p>Are you sure you want to end your session?</p>
            <div className="logout-actions">
              <button className="btn btn-primary" onClick={handleConfirmLogout}>
                Yes, Log Me Out
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
