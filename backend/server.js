const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// ===== MongoDB Connection =====
mongoose.connect(
  "mongodb+srv://MasumRafi:7EdFc1xeC0VtQ9Yw@compasscluster.2kbobl9.mongodb.net/compassDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// ===== Schema & Model =====
const DestinationSchema = new mongoose.Schema({
  name: String,
  img: String, // store image path
  desc: String
});

const Destination = mongoose.model("Destination", DestinationSchema);

// ===== Multer Setup for File Upload =====
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});
const upload = multer({ storage });

// ===== Routes =====
app.get("/api/destinations", async (req, res) => {
  const data = await Destination.find();
  res.json(data);
});

// POST with admin password check
app.post("/api/destinations", upload.single("img"), async (req, res) => {
  const { name, desc, password } = req.body;

  // simple admin check
  if (password !== "MasumAdmin123") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const newDest = new Destination({
    name,
    desc,
    img: `/uploads/${req.file.filename}` // local file path
  });

  await newDest.save();
  res.json({ message: "✅ Destination added successfully" });
});

// ===== Start Server =====
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
