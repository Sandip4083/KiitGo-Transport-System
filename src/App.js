import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Footer from "./pages/components/footer";
import Navbar from "./pages/components/Navbar";

import Complain from "./pages/Complain";
import About from "./pages/components/About";
import ViewComplaints from "./pages/components/ViewComplaints";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Logout from "./pages/logout";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import Adminlogin from "./pages/Adminlogin";
import ProtectedRoute from "./pages/ProtectedRoute";

// 🔹 Layout with Navbar + Footer
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

// 🔹 Public layout
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

      {/* 🔹 User Dashboard (Protected) */}
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

      {/* 🔹 Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🔹 User Dashboard (alternative) */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🔹 404 */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
