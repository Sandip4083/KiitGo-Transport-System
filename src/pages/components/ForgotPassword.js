import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/ForgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ ${data.message}`);
        return;
      }

      alert(`✅ ${data.message}`);
      navigate("/reset-password");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="loginpage">
      <form onSubmit={handleForgotPassword} className="login-form">
        <h1>Forgot Password</h1>

        {/* Email */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Send Reset Link</button>

        <div className="register-link">
          <p>Back to <a href="/">Login</a></p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
