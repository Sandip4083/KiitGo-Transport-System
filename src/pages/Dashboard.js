import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./Home";
import Contact from "./Contact";
import Complain from "./Complain";
import About from "./About";
import Logout from "./logout";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Verify user with backend
      fetch(`http://localhost:5000/user/${parsedUser.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("User verification failed");
          return res.json();
        })
        .then((data) => {
          setUser(data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("loggedInUser");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar user={user} />

      <main style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="complain" element={<Complain />} />
          <Route path="about" element={<About />} />
          <Route path="logout" element={<Logout />} />
          <Route path="" element={<Navigate to="home" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
