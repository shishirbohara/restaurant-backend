require("dotenv").config();
const express = require("express");
const pool = require("./db");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

pool
  .connect()
  .then(() => {
    console.log("DB connection success.");
  })
  .catch((err) => {
    console.log("DB connection error.", err.stack);
  })
  .finally(() => {
    pool.end();
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
