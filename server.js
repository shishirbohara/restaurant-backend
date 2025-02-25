require("dotenv").config();
const express = require("express");
const pool = require("./db");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", menuRoutes);

pool
  .connect()
  .then(() => {
    console.log("DB connection success.");
  })
  .catch((err) => {
    console.log("DB connection error.", err.stack);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
