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
// router.get("/", async (req, res) => {
//   const { page = 1, limit = 20, search = "" } = req.query;
//   const offset = (page - 1) * limit;


//   let baseQuery = `
//     SELECT 'aio' AS category, id, name, brand, price, qty FROM aio
//     UNION ALL
//     SELECT 'cabinet' AS category, id, name, brand, price, qty FROM cabinet
//     UNION ALL
//     SELECT 'accessories' AS category, id, name, brand, price, qty FROM accessories
//     UNION ALL
//     SELECT 'gpu' AS category, id, name, brand, price, qty FROM gpu
//     UNION ALL
//     SELECT 'motherboard' AS category, id, name, brand, price, qty FROM motherboard
//     UNION ALL
//     SELECT 'processors' AS category, id, name, brand, price, qty FROM processors
//     UNION ALL
//     SELECT 'psu' AS category, id, name, brand, price, qty FROM psu
//     UNION ALL
//     SELECT 'ram' AS category, id, name, brand, price, qty FROM ram
//     UNION ALL
//     SELECT 'ssd' AS category, id, name, brand, price, qty FROM ssd`;

//   let query;
//   let values = [];

//   // Add search functionality
//   if (search) {
//     query = `
//       SELECT * FROM (
//         ${baseQuery}
//       ) AS all_products
//       WHERE name LIKE ? OR brand LIKE ?
//       ORDER BY category, id
//       LIMIT ? OFFSET ?`;
//     values = [`%${search}%`, `%${search}%`, parseInt(limit), parseInt(offset)];
//   } else {
//     // Base query for pagination
//     query = `
//       SELECT * FROM (
//         ${baseQuery}
//       ) AS all_products
//       ORDER BY category, id
//       LIMIT ? OFFSET ?`;
//     values = [parseInt(limit), parseInt(offset)];
//   }

//   try {
//     // Execute query and fetch products
//     const [rows] = await db.execute(query, values);
//     res.status(200).json({ products: rows });
//   } catch (err) {
//     console.error("SQL Query Error:", err.message);
//     res.status(500).json({ error: "Server error" });
//   }
// });




// trial api
router.get("/", async (req, res) => {
  const { page = 1, search } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage;

  let query = `
    SELECT 'processors' AS category, id, name, price, brand, qty FROM processors
    UNION ALL
    SELECT 'motherboard' AS category, id, name, price, brand, qty FROM motherboard
    UNION ALL
    SELECT 'gpu' AS category, id, name, price, brand, qty FROM gpu
    UNION ALL
    SELECT 'aio' AS category, id, name, price, brand, qty FROM aio
    UNION ALL
    SELECT 'cabinet' AS category, id, name, price, brand, qty FROM cabinet
    UNION ALL
    SELECT 'psu' AS category, id, name, price, brand, qty FROM psu
    UNION ALL
    SELECT 'ram' AS category, id, name, price, brand, qty FROM ram
    UNION ALL
    SELECT 'ssd' AS category, id, name, price, brand, qty FROM ssd
    LIMIT ${itemsPerPage} OFFSET ${offset};
  `;

  if (search) {
    query = `
        SELECT 'processors AS category', id, name, price, brand, qty FROM processors
        UNION ALL
        SELECT 'motherboard AS category', id, name, price, brand, qty FROM motherboard
        UNION ALL
        SELECT 'gpu' AS category, id, name, price, brand, qty FROM gpu
        UNION ALL
        SELECT 'aio' AS category, id, name, price, brand, qty FROM aio
        UNION ALL
        SELECT 'cabinet' AS category, id, name, price, brand, qty FROM cabinet
        UNION ALL
        SELECT 'psu' AS category, id, name, price, brand, qty FROM psu
        UNION ALL
        SELECT 'ram' AS category, id, name, price, brand, qty FROM ram
        UNION ALL
        SELECT 'ssd' AS category, id, name, price, brand, qty FROM ssd
      ) AS all_products
      WHERE name LIKE '%${search}%'
      LIMIT ${itemsPerPage} OFFSET ${offset};
    `;
  }

  try {
    console.log("SQL Query:", query);

    const [rows] = await db.execute(query);
    res.json({ products: rows });
  } catch (err) {
    console.error("SQL Query Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/images/:productType/:productId", async (req, res) => {
  const { productType, productId } = req.params;

  const query = `
    SELECT image_url
    FROM product_images
    WHERE product_type = ? AND product_id = ?
    LIMIT 1
  `;

  try {
    const [rows] = await db.execute(query, [productType, productId]);
    // console.log("Fetched Image URL:", rows);
    if (rows.length > 0) {
      res.json({ image_url: rows[0].image_url });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
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