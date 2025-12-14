import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ Always computed live
  const criteria = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    specialChar: /[!@#$%^&*]/.test(newPassword),
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const savedData = JSON.parse(localStorage.getItem("resetToken"));

    if (!savedData) {
      alert("❌ No reset request found.");
      return;
    }

    if (savedData.resetToken !== token) {
      alert("❌ Invalid or expired token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    // ✅ Block weak passwords
    if (!criteria.length || !criteria.uppercase || !criteria.lowercase || !criteria.number || !criteria.specialChar) {
      alert("❌ Password must include: 8+ chars, uppercase, lowercase, number, special char.");
      return;
    }

    // ✅ Update user password
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === savedData.username ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("resetToken");

    alert("✅ Password reset successfully!");
    navigate("/login");
  };

  return (
    <div className="loginpage">
      <form onSubmit={handleResetPassword} className="login-form">
        <h1>Reset Password</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowNewPassword(!showNewPassword)} className="icon eye-icon">
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="input-box">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="icon eye-icon">
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* ✅ Live criteria */}
        <div className="password-criteria">
          <p>Password must contain:</p>
          <ul>
            <li style={{ color: criteria.length ? "green" : "red" }}>At least 8 characters</li>
            <li style={{ color: criteria.uppercase ? "green" : "red" }}>Uppercase letter</li>
            <li style={{ color: criteria.lowercase ? "green" : "red" }}>Lowercase letter</li>
            <li style={{ color: criteria.number ? "green" : "red" }}>Number</li>
            <li style={{ color: criteria.specialChar ? "green" : "red" }}>Special character (!@#$%^&*)</li>
          </ul>
        </div>

        <button type="submit" className="btn">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
