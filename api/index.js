const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(express.json());

// ============ MongoDB Connection (Serverless-safe) ============
const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Middleware — connect to DB on every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// ============ Mongoose Models ============

// Counter (for auto-increment userId)
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

// User
const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});
userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Complaint
const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  issue: { type: String, required: true },
  userId: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  notified: { type: Boolean, default: false },
});
const Complaint =
  mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);

// Contact
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// ============ AUTH ROUTES ============

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

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

// Register
app.post("/api/register", async (req, res) => {
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

// Forgot Password
app.post("/api/ForgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = Math.random().toString(36).substr(2, 8);
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    console.log(`Reset token for ${email}: ${resetToken}`);
    res.json({ message: "Reset token generated! Check console for token (simulation)" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get User by ID
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users (admin)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============ COMPLAINT ROUTES ============

// Create complaint
app.post("/api/complaints", async (req, res) => {
  try {
    const { name, roll, issue, userId } = req.body;
    if (!name || !roll || !issue || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({
      name,
      roll,
      issue,
      userId,
      status: "pending",
      notified: false,
    });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    console.error("Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all complaints
app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Get Complaints Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Resolve complaint
app.put("/api/complaints/:id/resolve", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.status = "resolved";
    complaint.notified = false;
    await complaint.save();

    res.json(complaint);
  } catch (err) {
    console.error("Resolve Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark complaint as notified
app.put("/api/complaints/:id/notify", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.notified = true;
    await complaint.save();
    res.json({ message: "Notification marked as seen" });
  } catch (err) {
    console.error("Notify Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete complaint
app.delete("/api/complaints/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Delete Complaint Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============ CONTACT ROUTES ============

// Submit contact message
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

// Get all contact messages (admin)
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Get Contacts Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete contact message
app.delete("/api/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact)
      return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete Contact Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============ BUS ROUTES ============
const busRoutesData = [
  { Bus_ID: 1, Bus_Number: "KB-101", Source: "Gate A", Destination: "Library Block", Stop_Name: "Gate A", Stop_Order: 1, Time: "07:00 AM" },
  { Bus_ID: 1, Bus_Number: "KB-101", Source: "Gate A", Destination: "Library Block", Stop_Name: "Block X", Stop_Order: 2, Time: "07:10 AM" },
  { Bus_ID: 1, Bus_Number: "KB-101", Source: "Gate A", Destination: "Library Block", Stop_Name: "Block Y", Stop_Order: 3, Time: "07:20 AM" },
  { Bus_ID: 1, Bus_Number: "KB-101", Source: "Gate A", Destination: "Library Block", Stop_Name: "Block Z", Stop_Order: 4, Time: "07:30 AM" },
  { Bus_ID: 1, Bus_Number: "KB-101", Source: "Gate A", Destination: "Library Block", Stop_Name: "Library Block", Stop_Order: 5, Time: "07:40 AM" },
];

app.get("/api/routes", (req, res) => {
  res.json(busRoutesData);
});

// ============ Health Check ============
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============ Export for Vercel Serverless ============
module.exports = app;
