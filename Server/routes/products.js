const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Storage configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/api/products', async (req, res) => {
  const { page = 1, category = 'all', search = '' } = req.query;
  const limit = 20; // Items per page
  const offset = (page - 1) * limit;

  try {
    let query = '';
    if (category === 'all') {
      // Combine data from all tables
      query = `
        SELECT 'aio' AS category, id, name, price FROM aio
        UNION ALL
        SELECT 'cabinet' AS category, id, name, price FROM cabinet
        UNION ALL
        SELECT 'gpu' AS category, id, name, price FROM gpu
        UNION ALL
        SELECT 'motherboard' AS category, id, name, price FROM motherboard
        UNION ALL
        SELECT 'processors' AS category, id, name, price FROM processors
        UNION ALL
        SELECT 'psu' AS category, id, name, price FROM psu
        UNION ALL
        SELECT 'ram' AS category, id, name, price FROM ram
        UNION ALL
        SELECT 'ssd' AS category, id, name, price FROM ssd
        WHERE name LIKE ? LIMIT ? OFFSET ?`;
      const products = await db.query(query, [`%${search}%`, limit, offset]);
      res.json({ products });
    } else {
      // Query specific table
      const query = `
        SELECT '${category}' AS category, id, name, price
        FROM ${category}
        WHERE name LIKE ? LIMIT ? OFFSET ?`;
      const products = await db.query(query, [`%${search}%`, limit, offset]);
      res.json({ products });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Add new product
router.post("/", upload.single("image"), (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.filename : null;

  // Here you would save the product to your database
  // Assuming a MongoDB example with Mongoose
  const Product = require("../models/Product");
  const newProduct = new Product({ name, description, price, category, image });

  newProduct
    .save()
    .then(() => res.status(201).json({ message: "Product added successfully!" }))
    .catch((error) => res.status(500).json({ message: "Failed to add product", error }));
});

module.exports = router;
