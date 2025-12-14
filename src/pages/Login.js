import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import kiitgoLogo from "./assets/KIITGO_logo.png";
import "./assets/adminlogin.css";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load saved email if "Remember Me" was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("userRememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
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
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info directly (matches backend response)
        localStorage.setItem("loggedInUser", JSON.stringify(data));

        // Handle "Remember Me"
        if (rememberMe) localStorage.setItem("userRememberEmail", email);
        else localStorage.removeItem("userRememberEmail");

        // Redirect based on role
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard/home");
        }
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="loginpage">
      <div className="logo-container">
        <img src={kiitgoLogo} alt="KIITGO Logo" className="login-logo" />
        <h1 className="login-heading">User Login</h1>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        {error && <p className="error-message">{error}</p>}

        <div className="input-box">
          <input
            type="email"
            placeholder="User Email"
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
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit" className="btn">Login</button>

        <div className="register-link">
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
