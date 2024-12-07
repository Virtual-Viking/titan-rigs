const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql2');

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Route to create an account
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) return res.status(500).json({ message: 'Database query error', error: err });
      if (result.length > 0) return res.status(400).json({ message: 'Email already in use' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ message: 'Database insertion error', error: err });
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to log in
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) return res.status(500).json({ message: 'Database query error', error: err });
      if (result.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

      const user = result[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

      // Create JWT
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.username}` });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});