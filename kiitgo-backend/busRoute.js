// busRoute.js
const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
  Route_Name: String,
  Stop_Name: String,
  Time: String,
});

module.exports = mongoose.model("BusRoute", busRouteSchema);
