import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Complain from "./pages/Complain";
import ViewComplaints from "./pages/components/ViewComplaints";
import About from "./pages/components/About";
import Login from "./pages/Login";
import Logout from "./pages/logout";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Adminlogin from "./pages/Adminlogin";

// Layout for pages with Navbar + Footer
function DashboardLayout() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

// Layout for public pages with Navbar + Footer
function PublicLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/login" element={<Adminlogin />} />

        {/* 🔹 Public About Page */}
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        {/* 🔹 User Dashboard (Protected + Navbar + Footer) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="complain" element={<Complain />} />
          <Route path="view-complaints" element={<ViewComplaints />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* 🔹 Admin Dashboard (Protected, no footer) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔹 User Dashboard alternative (without navbar/footer) */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔹 404 fallback */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
