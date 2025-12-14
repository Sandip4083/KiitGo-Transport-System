import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';
import './assets/Login.css';

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    });
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!Object.values(criteria).every(Boolean)) {
      setMessage({ type: "error", text: "Password does not meet all requirements!" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setTimeout(() => navigate("/"), 1500); // redirect to login
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error. Try again later." });
    }
  };

  return (
    <div className="loginpage">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        {message.text && (
          <p className={message.type === "error" ? "error-message" : "success-message"}>
            {message.text}
          </p>
        )}

        <div className="input-box">
          <input 
            type="email" 
            placeholder="Your KIIT Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          /> 
        </div>

        <div className="input-box">
          <input 
            type="text" 
            placeholder="New Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          /> 
        </div>

        <div className="input-box">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="New Password" 
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

        {password && (
          <ul className="password-criteria">
            <li className={criteria.length ? "valid" : "invalid"}>✔ At least 8 characters</li>
            <li className={criteria.upper ? "valid" : "invalid"}>✔ One uppercase letter</li>
            <li className={criteria.lower ? "valid" : "invalid"}>✔ One lowercase letter</li>
            <li className={criteria.number ? "valid" : "invalid"}>✔ One number</li>
            <li className={criteria.special ? "valid" : "invalid"}>✔ One special character (@$!%*?&)</li>
          </ul>
        )}

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

        <button type="submit" className="btn">Register</button>

        <div className="register-link">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </form>
    </div>
  );
}

export default Register;
