import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleYes = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleNo = () => navigate(-1);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1 className="logout-title">Log Out</h1>
        <p className="logout-subtitle">
          Are you sure you want to sign out of your account?
        </p>
        <div className="logout-actions">
          <button className="btn btn-primary" onClick={handleYes}>
            Yes, Log Me Out
          </button>
          <button className="btn btn-secondary" onClick={handleNo}>
            Cancel
          </button>
        </div>
      </div>

      {/* Scoped styles */}
      <style jsx="true">{`
        .logout-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4cafef 0%, #2a2a72 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 1rem;
        }

        .logout-card {
          background: #fff;
          padding: 2.5rem 3rem;
          border-radius: 1rem;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          max-width: 420px;
          width: 100%;
          text-align: center;
        }

        .logout-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #2a2a72;
        }

        .logout-subtitle {
          font-size: 1rem;
          color: #555;
          margin-bottom: 2rem;
          line-height: 1.4;
        }

        .logout-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 0.5rem;
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
      `}</style>
    </div>
  );
}
