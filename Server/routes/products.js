const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mysql = require("mysql2/promise");

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
    // console.log("SQL Query:", query);

    const [rows] = await db.execute(query);
    res.json({ products: rows });
  } catch (err) {
    // console.error("SQL Query Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;

  try {
    const query = `SELECT * FROM ${mysql.escapeId(categoryName)}`;
    const [rows] = await db.execute(query);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found in ${categoryName}.` });
    }

    res.json({ products: rows });
  } catch (error) {
    // console.error("Error fetching category products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get image api for productgrid.jsx
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
    // console.log("Image Query Result:", rows); // Debugging
    if (rows.length > 0) {
      res.json({ image_url: rows[0].image_url });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (err) {
    // console.error("SQL Query Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// separate Fetch images api for category page and product page since union table will alter product id and image will not load.
router.get("/category/images/:categoryName/:productId", async (req, res) => {
  const { categoryName, productId } = req.params;

  const query = `
    SELECT image_url
    FROM product_images
    WHERE product_type = ? AND product_id = ?
    LIMIT 1
  `;

  try {
    const [rows] = await db.execute(query, [categoryName, productId]);
    if (rows.length > 0) {
      res.json({ image_url: rows[0].image_url });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (err) {
    // console.error("Error fetching category images:", err.message);
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
    // console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// GET: Fetch processors by brand
router.get("/processors/:brand", async (req, res) => {
  const { brand } = req.params;

  // console.log(`Request received for brand: ${brand}`);

  if (!["intel", "amd"].includes(brand.toLowerCase())) {
    return res.status(400).json({ error: "Invalid brand specified" });
  }

  try {
    const query = `
      SELECT * 
      FROM processors
      WHERE brand = ?
      ORDER BY name;
    `;

    const [rows] = await db.execute(query, [brand]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No processors found for ${brand}` });
    }

    // console.log("Found processors:", rows); // Log the found processors

    res.json({ processors: rows });
  } catch (err) {
    console.error("Error fetching processors by brand:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch motherboard by chipset
router.get("/motherboards/:chipset", async (req, res) => {
  const { chipset } = req.params;

  // console.log(`Request received for chipset: ${chipset}`);

  try {
    const query = `
      SELECT * 
      FROM motherboard
      WHERE chipset = ?
      ORDER BY name;
    `;

    const [rows] = await db.execute(query, [chipset]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No motherboards found for chipset: ${chipset}` });
    }

    res.json({ motherboards: rows });
  } catch (err) {
    // console.error("Error fetching motherboards by chipset:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: RAM based on DDR type
router.get("/ram/:ddrtype", async (req, res) => {
  const { ddrtype } = req.params;

  // console.log(`Request received for DDR type: ${ddrtype}`);

  try {
    const query = `
      SELECT * 
      FROM ram
      WHERE ddrtype = ?
      ORDER BY name;
    `;

    const [rows] = await db.execute(query, [ddrtype]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No RAM found for DDR type: ${ddrtype}` });
    }

    res.json({ ram: rows });
  } catch (err) {
    // console.error("Error fetching RAM by DDR type:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all SSDs
router.get("/ssds", async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM ssd
      ORDER BY name;
    `;

    const [rows] = await db.execute(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No SSDs found" });
    }

    res.json({ ssds: rows });
  } catch (err) {
    // console.error("Error fetching SSDs:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all GPUs
router.get("/gpus", async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM gpu
      ORDER BY name;
    `;
    const [rows] = await db.execute(query);

    // If no GPUs found, return a 404 response
    if (rows.length === 0) {
      return res.status(404).json({ message: "No GPUs found" });
    }

    res.json({ gpus: rows });
  } catch (err) {
    // console.error("Error fetching GPUs:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all AIOs
router.get("/aios", async (req, res) => {
  try {
    // Query to fetch all AIOs
    const query = `
      SELECT * 
      FROM aio
      ORDER BY name;
    `;

    const [rows] = await db.execute(query);

    // If no AIOs found, return a 404 response
    if (rows.length === 0) {
      return res.status(404).json({ message: "No AIO coolers found" });
    }

    res.json({ aios: rows });
  } catch (err) {
    // Log the error and send a 500 response if an exception occurs
    // console.error("Error fetching AIO coolers:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/psu/:maxtdp", async (req, res) => {
  const { maxtdp } = req.params; // Extract `maxtdp` from URL parameters

  // console.log(`Request received for PSU with minimum wattage: ${maxtdp * 3}`);

  try {
    const minWatt = maxtdp * 3; // Calculate PSU wattage threshold (maxtdp * 3)

    const query = `
      SELECT * 
      FROM psu
      WHERE watt > ?
      ORDER BY watt;
    `;

    const [rows] = await db.execute(query, [minWatt]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: `No PSUs found with wattage greater than ${minWatt}`,
      });
    }

    res.json({ psus: rows });
  } catch (err) {
    // console.error("Error fetching PSUs:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all cabinets compatible with selected AIO
router.get("/cabinets/:aioLen", async (req, res) => {
  const { aioLen } = req.params;

  try {
    // Convert AIO length to numeric value by removing "mm" and converting to number
    const aioLenNumeric = parseInt(aioLen.replace(/[^\d]/g, ""), 10);

    console.log("aioLenNumeric", aioLenNumeric);

    // Query to fetch all cabinets where radiatorlen is greater than aioLen
    const query = `
      SELECT * 
      FROM cabinet
      WHERE CAST(radiatorlen AS UNSIGNED) <= ?
      ORDER BY name;
    `;

    const [rows] = await db.execute(query, [aioLenNumeric]);

    // If no cabinets found, return a 404 response
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No cabinets available for selected AIO" });
    }

    res.json({ cabinets: rows });
  } catch (err) {
    // Log the error and send a 500 response if an exception occurs
    console.error("Error fetching cabinets:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
