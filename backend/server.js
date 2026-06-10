const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db.js");

const app = express();



connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Portal API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use(
  "/api/applications",
  applicationRoutes
);