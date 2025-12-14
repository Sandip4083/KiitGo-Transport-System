import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import kiitgoLogo from "./assets/KIITGO_logo.png";
import "./Adminlogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load remembered credentials (if any)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adminRememberMe"));
    if (saved) {
      setEmail(saved.email || "");
      setPassword(saved.password || "");
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Backend sends user object directly, no .user
        if (data.role !== "admin") {
          setError("Access denied. You are not an admin.");
          return;
        }

        // Save admin info in localStorage
        localStorage.setItem("loggedInAdmin", JSON.stringify(data));

        // Handle "Remember Me"
        if (rememberMe) {
          localStorage.setItem(
            "adminRememberMe",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("adminRememberMe");
        }

        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="loginpage">
      <div className="logo-container">
        <img src={kiitgoLogo} alt="KIITGO Logo" className="login-logo" />
        <h1 className="login-heading">Admin Login</h1>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error-msg">{error}</p>}

        <div className="input-box">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="icon eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{" "}
            Remember me
          </label>
        </div>

        <button type="submit" className="btn">
          Login as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
