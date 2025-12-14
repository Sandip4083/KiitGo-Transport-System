const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const fs = require("fs");
const User = require("./user");       // user model
const Complaint = require("./complaint"); // complaint model
const Contact = require("./contact"); // contact model (to save messages)

require("./db");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- FORGOT PASSWORD ---------------- */
app.post("/ForgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a reset token (random string)
    const resetToken = Math.random().toString(36).substr(2, 8);

    // Save token in user document (optional: add expiry time)
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
    await user.save();

    // Simulate sending email
    console.log(`Reset token for ${email}: ${resetToken}`);

    res.json({ message: "Reset token generated! Check console for token (simulation)" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ---------------- REGISTER ---------------- */
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful! Please login." });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- GET USER ---------------- */
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- COMPLAINT ROUTES ---------------- */

// Create a new complaint
app.post("/complaints", async (req, res) => {
  try {
    const { name, roll, issue, userId } = req.body;
    if (!name || !roll || !issue || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({ name, roll, issue, userId, status: "pending", notified: false });
    await newComplaint.save();

    res.status(201).json(newComplaint);
  } catch (err) {
    console.error("Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all complaints
app.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.json(complaints);   // ✅ send array directly
  } catch (err) {
    console.error("Get Complaints Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update complaint status (resolve) & keep notified = false for user
app.put("/complaints/:id/resolve", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = "resolved";
    complaint.notified = false; // notification pending for user
    await complaint.save();

    res.json(complaint);
  } catch (err) {
    console.error("Resolve Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark complaint as notified (user has seen it)
app.put("/complaints/:id/notify", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.notified = true;
    await complaint.save();

    res.json({ message: "Notification marked as seen" });
  } catch (err) {
    console.error("Notify Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete complaint
app.delete("/complaints/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    complaint.status = "deleted";

    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Delete Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update complaint status (resolve) & keep notified = false for user (admin only)
app.put("/complaints/:id/resolve", async (req, res) => {
  try {
    const { role } = req.body; // get role from request (admin only)

    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admin can resolve complaints." });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = "resolved";   // mark as resolved
    complaint.notified = false;      // notification pending for user
    await complaint.save();

    res.json({ message: "Complaint resolved successfully", complaint });
  } catch (err) {
    console.error("Resolve Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ---------------- ADMIN ROUTES ---------------- */

// Get all users (admin only)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- BUS ROUTES (JSON FILE) ---------------- */
app.get("/routes", (req, res) => {
  fs.readFile("./dummy_bus_routes.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Routes Error:", err);
      return res.status(500).json({ message: "Failed to load routes" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      res.status(500).json({ message: "Invalid routes data" });
    }
  });
});

/* ---------------- CONTACT FORM ---------------- */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message received successfully!" });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
/*----------------------- Get all contact messages (for admin)=------------------------*/
app.get("/contact", async (req, res) => {
  try {
    const contact = await Contact.find().sort({ date: -1 });
    res.json(contact);
  } catch (err) {
    console.error("Get Contacts Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Delete a contact message (admin)
app.delete("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete Contact Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ---------------- SERVER ---------------- */
app.listen(5000, () => console.log("✅ Server running on port 5000"));
