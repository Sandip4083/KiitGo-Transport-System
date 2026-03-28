const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sandipcloud26_db_user:RuAxUhhOVcnew8TZ@cluster1.yfhtc8t.mongodb.net/kiitgo",
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
