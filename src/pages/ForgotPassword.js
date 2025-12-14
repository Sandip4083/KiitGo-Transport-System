import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './assets/Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [message, setMessage] = useState({ type: "", text: "" });
  const [criteria, setCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const navigate = useNavigate();

  // ✅ Update password criteria live
  useEffect(() => {
    setCriteria({
      length: newPassword.length >= 8,
      upper: /[A-Z]/.test(newPassword),
      lower: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[@$!%*?&]/.test(newPassword),
    });
  }, [newPassword]);

  const handleReset = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if user exists by email
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      setMessage({ type: "error", text: "Email not found!" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    // ✅ Validate criteria
    if (!Object.values(criteria).every(Boolean)) {
      setMessage({ type: "error", text: "Password must meet all requirements!" });
      return;
    }

    // ✅ Update password
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    setMessage({ type: "success", text: "Password reset successful! Redirecting..." });

    setTimeout(() => {
      navigate("/"); // back to login page
    }, 1500);
  };

  return (
    <div className="loginpage">
      <form onSubmit={handleReset}>
        <h1>Forgot Password</h1>

        {/* ✅ Show professional messages */}
        {message.text && (
          <p className={message.type === "error" ? "error-message" : "success-message"}>
            {message.text}
          </p>
        )}

        {/* Email */}
        <div className="input-box">
          <input 
            type="email" 
            placeholder="Enter Your Registered Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          /> 
        </div>

        {/* New Password */}
        <div className="input-box">
          <input 
            type={showNewPassword ? "text" : "password"} 
            placeholder="New Password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required 
          /> 
          <span 
            className="icon eye-icon" 
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* ✅ Show checklist only while typing */}
        {newPassword && (
          <ul className="password-criteria">
            <li className={criteria.length ? "valid" : "invalid"}>✔ At least 8 characters</li>
            <li className={criteria.upper ? "valid" : "invalid"}>✔ One uppercase letter</li>
            <li className={criteria.lower ? "valid" : "invalid"}>✔ One lowercase letter</li>
            <li className={criteria.number ? "valid" : "invalid"}>✔ One number</li>
            <li className={criteria.special ? "valid" : "invalid"}>✔ One special character (@$!%*?&)</li>
          </ul>
        )}

        {/* Confirm Password */}
        <div className="input-box">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          /> 
          <span 
            className="icon eye-icon" 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="btn">Reset Password</button>

        <div className="register-link">
          <p>Back to <a href="/">Login</a></p>
        </div>
      </form>

      {/* ✅ Inline styles for checklist + messages */}
      <style>{`
        .password-criteria {
          margin: 6px 0 10px 20px;
          padding: 0;
          font-size: 12px;  /* smaller font */
          line-height: 1.2; /* compact spacing */
        }
        .password-criteria li {
          margin-bottom: 2px;
          list-style: none;
        }
        .password-criteria .valid {
          color: green;
        }
        .password-criteria .invalid {
          color: red;
        }
        .error-message {
          color: red;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .success-message {
          color: green;
          font-size: 13px;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}

export default ForgotPassword;
