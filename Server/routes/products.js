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
    console.log("SQL Query:", query);

    const [rows] = await db.execute(query);
    res.json({ products: rows });
  } catch (err) {
    console.error("SQL Query Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// do not touch this api or category page fil fetch no data
router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  try {
    const query = `SELECT id, name, price, brand, qty FROM ${categoryName}`;
    const [products] = await db.query(query);
    res.json({ products });
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({ error: 'Failed to fetch products for this category.' });
  }
});

router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching product details for ID: ${id}`);
  try {
    const productQuery = `
      SELECT * FROM (
        SELECT 'processors' AS category, id, name, price, brand, qty FROM processors
        UNION ALL
        SELECT 'motherboards' AS category, id, name, price, brand, qty FROM motherboards
        UNION ALL
        SELECT 'gpus' AS category, id, name, price, brand, qty FROM gpus
        UNION ALL
        SELECT 'rams' AS category, id, name, price, brand, qty FROM rams
        UNION ALL
        SELECT 'psus' AS category, id, name, price, brand, qty FROM psus
        UNION ALL
        SELECT 'aios' AS category, id, name, price, brand, qty FROM aios
        UNION ALL
        SELECT 'cabinets' AS category, id, name, price, brand, qty FROM cabinets
        UNION ALL
        SELECT 'ssds' AS category, id, name, price, brand, qty FROM ssds
      ) AS all_products
      WHERE id = ?;
    `;

    const [productResults] = await db.query(productQuery, [id]);

    if (!productResults.length) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = productResults[0];

    // Query to fetch product images
    const imageQuery = `SELECT image_url FROM product_images WHERE product_id = ?`;
    const [imageResults] = await db.query(imageQuery, [id]);

    // Query to fetch product description
    const descriptionQuery = `SELECT description FROM product_descriptions WHERE product_id = ?`;
    const [descriptionResults] = await db.query(descriptionQuery, [id]);

    res.json({
      product,
      images: imageResults.map((img) => img.image_url),
      description: descriptionResults.length ? descriptionResults[0].description : '',
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Failed to fetch product details.' });
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
    console.log("Image Query Result:", rows); // Debugging
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
    console.error("Error fetching category images:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// for ProductPage.jsx
router.get("/search", async (req, res) => {
  const { name, category } = req.query;

  if (!name || !category) {
    return res.status(400).json({ error: "Product name and category are required" });
  }

  try {
    const validCategories = [
      "processors",
      "motherboard",
      "gpu",
      "ram",
      "psu",
      "aio",
      "cabinet",
      "ssd",
    ];

    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: "Invalid category name" });
    }

    const productQuery = `
      SELECT * FROM ${category}
      WHERE name = ?
      LIMIT 1;
    `;
    const [productRows] = await db.query(productQuery, [name]);

    if (productRows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productRows[0];

    const imageQuery = `
      SELECT image_url FROM product_images
      WHERE product_id = ?
      LIMIT 1;
    `;
    const [imageRows] = await db.query(imageQuery, [product.id]);

    res.json({
      product,
      image: imageRows.length > 0 ? imageRows[0].image_url : "No image available",
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Internal server error" });
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



// check connection
router.get('/health-check', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ success: true, message: 'Database connection is working', result: rows[0].result });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});
// GET: Fetch processors by brand
router.get("/processors/:brand", async (req, res) => {
  const { brand } = req.params;

  console.log(`Request received for brand: ${brand}`);

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

    console.log("Found processors:", rows); // Log the found processors

    res.json({ processors: rows });
  } catch (err) {
    console.error("Error fetching processors by brand:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch motherboard by chipset
router.get("/motherboards/:chipset", async (req, res) => {
  const { chipset } = req.params;

  console.log(`Request received for chipset: ${chipset}`);

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
    console.error("Error fetching motherboards by chipset:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: RAM based on DDR type
router.get("/ram/:ddrtype", (req, res) => {
  const { ddrtype } = req.params;

  const query = "SELECT * FROM ram WHERE ddrtype = ?";

  db.query(query, [ddrtype], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res
        .status(500)
        .json({ message: "Server error while fetching RAM" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: `No RAM modules found for DDR type: ${ddrtype}` });
    }

    // Return the RAM modules found
    res.json({ ram: results });
  });
});


module.exports = router;


