const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1️⃣ MongoDB Connection
mongoose.connect(
  "mongodb+srv://MasumRafi:7EdFc1xeC0VtQ9Yw@compasscluster.2kbobl9.mongodb.net/compassDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ DB Error:", err));

// 2️⃣ Schema & Model
const DestinationSchema = new mongoose.Schema({
  name: String,
  img: String,
  desc: String
});

const Destination = mongoose.model("Destination", DestinationSchema);

// 3️⃣ Routes
app.get("/api/destinations", async (req, res) => {
  const data = await Destination.find();
  res.json(data);
});

app.post("/api/destinations", async (req, res) => {
  const newDest = new Destination(req.body);
  await newDest.save();
  res.json({ message: "Destination added" });
});

// 4️⃣ Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
