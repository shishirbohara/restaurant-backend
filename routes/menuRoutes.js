const express = require("express");
const pool = require("../db");
const router = express.Router();

router.post("/menu", async (req, res) => {
  const { dish_name, dish_description, dish_price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO menu (dish_name, dish_description, dish_price) VALUES ($1, $2, $3) RETURNING *",
      [dish_name, dish_description, dish_price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Error creating menu" });
  }
});

router.get("/menu", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error fetching data", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

router.put("/menu/:id", async (req, res) => {
  const { id } = req.params;
  const { dish_name, dish_description, dish_price } = req.body;

  try {
    const result = await pool.query(
      "UPDATE menu SET dish_name = $1, dish_description =$2, dish_price = $3 WHERE id = $4 RETURNING *",
      [dish_name, dish_description, dish_price, id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error updating menu", error);
    res.status(500).json({ error: "Error updating menu" });
  }
});

router.delete("/menu/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM menu WHERE id = $1 RETURNING*", [id]);
    res.status(201).json({ message: "Menu deletion success." });
  } catch (error) {
    console.log("Error deleting data", error);
    res.status(500).json({ error: "Error" });
  }
});

module.exports = router;
