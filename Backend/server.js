// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const connectDB = require('./db/connection'); // ✅ Renamed to avoid duplicate declaration
// const userRouter = require('./controllers/userRoutes'); // adjust path if needed
const {app}=require('./app')
// Create Express app
// const app = express();

// Middleware to parse incoming JSON
// app.use(express.json());

// Mount user-related routes
// app.use('/users', userRouter);

// Test route
app.get('/test', (req, res) => {
  console.log("It is running");
  res.send("Server is up and running!");
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
