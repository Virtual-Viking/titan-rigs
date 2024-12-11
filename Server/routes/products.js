const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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
