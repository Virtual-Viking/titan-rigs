const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mysql = require("mysql2/promise"); // Use promise-based MySQL

// Import db connection (ensure this is properly set up in your project)
const db = require("../db"); // Adjust the path as per your project structure

// Storage configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Adjust this path as needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET: Fetch Products
router.get("/", async (req, res) => {
  const { page = 1, search } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage;

  let query = `
    SELECT 'aio' AS category, id, name, price, brand FROM aio
    UNION ALL
    SELECT 'cabinet', id, name, price, brand FROM cabinet
    UNION ALL
    SELECT 'gpu', id, name, price, Brand FROM gpu
    UNION ALL
    SELECT 'processors', id, name, price, vendor FROM processors
    UNION ALL
    SELECT 'psu', id, name, price, brand FROM psu
    UNION ALL
    SELECT 'ram', id, name, price, brand FROM ram
    UNION ALL
    SELECT 'ssd', id, name, price, brand FROM ssd
    ORDER BY category, id
    LIMIT ? OFFSET ?`;

  let values = [itemsPerPage, offset];

  if (search) {
    query = `
      SELECT * FROM (
        SELECT 'aio' AS category, id, name, price, brand FROM aio
        UNION ALL
        SELECT 'cabinet', id, name, price, brand FROM cabinet
        UNION ALL
        SELECT 'gpu', id, name, price, Brand FROM gpu
        UNION ALL
        SELECT 'processors', id, name, price, vendor FROM processors
        UNION ALL
        SELECT 'psu', id, name, price, brand FROM psu
        UNION ALL
        SELECT 'ram', id, name, price, brand FROM ram
        UNION ALL
        SELECT 'ssd', id, name, price, brand FROM ssd
      ) AS all_products
      WHERE name LIKE ?
      ORDER BY category, id
      LIMIT ? OFFSET ?`;
    values = [`%${search}%`, itemsPerPage, offset];
  }

  try {
    const [rows] = await db.execute(query, values);
    res.json({ products: rows });
  } catch (err) {
    console.error("SQL Query Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// POST: Add New Product
router.post("/", upload.single("image"), async (req, res) => {
  const { name, price, category } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const query = `
      INSERT INTO ${mysql.escapeId(category)} (name, price, image)
      VALUES (?, ?, ?)`;
    await db.execute(query, [name, price, image]);
    res.status(201).json({ message: "Product added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

module.exports = router;
