const mongoose = require("mongoose");

// Import Counter model (we’ll define it below)
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

// Create or get Counter model
const Counter = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

// Define User Schema
const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true }, // 👈 our numeric incremental ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Pre-save hook to increment userId automatically
userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "userId" },          // counter name
      { $inc: { seq: 1 } },       // increment by 1
      { new: true, upsert: true } // create if doesn’t exist
    );

    this.userId = counter.seq; // assign new userId
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
