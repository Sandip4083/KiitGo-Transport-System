import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  // ✅ Safely parse localStorage items
  const admin = (() => {
    const item = localStorage.getItem("loggedInAdmin");
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  })();

  const user = (() => {
    const item = localStorage.getItem("loggedInUser");
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  })();

  // Check role individually
  if (role === "admin") {
    if (!admin || admin.role !== "admin") {
      return <Navigate to="/admin/login" replace />;
    }
    return children; // Admin allowed
  }

  if (role === "user") {
    if (!user || user.role !== "user") {
      return <Navigate to="/login" replace />;
    }
    return children; // User allowed
  }

  // Optional: fallback if no role specified
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
