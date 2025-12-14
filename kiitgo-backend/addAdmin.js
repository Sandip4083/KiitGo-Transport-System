const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./user"); // your user model
require("./db"); // connects to MongoDB

async function addAdmin() {
  try {
    const hashed = await bcrypt.hash("kiitgo123", 10);

    const admin = new User({
      name: "Admin",
      email: "kiitgo@kiit.ac.in",
      password: hashed,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created!");
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    mongoose.disconnect();
  }
}

addAdmin();
