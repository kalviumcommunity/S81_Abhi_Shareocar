// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const connetion = require('./db/connection'); // adjust path if needed
const userRoutes = require('../controllers/userRoutes'); // adjust path if needed

// Create Express app
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Mount user-related routes
app.use('/users', userRoutes);

// Test route
app.get('/test', (req, res) => {
    console.log("It is running");
    res.send("Server is up and running!");
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
