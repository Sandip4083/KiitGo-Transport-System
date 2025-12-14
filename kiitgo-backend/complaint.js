const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  issue: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  notified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Complaint", complaintSchema);

