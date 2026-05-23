const express = require("express");
const cors = require("cors");

const stateRoutes = require("./routes/stateRoutes");
const districtRoutes = require("./routes/districtRoutes");
const subDistrictRoutes = require("./routes/subDistrictRoutes");
const villageRoutes = require("./routes/villageRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/states", stateRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/subdistricts", subDistrictRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Village API Server Running"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});