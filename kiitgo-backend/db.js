const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sandipcloud26_db_user:Cloud2025@cluster0.zorpdtk.mongodb.net/?appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
