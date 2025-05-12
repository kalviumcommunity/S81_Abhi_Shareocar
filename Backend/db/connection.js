const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongodb); // ⬅️ Simplified, no options needed
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = connect;
