const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ErrorMiddleware = require("./middleware/error");
const {userRouter} = require("./controllers/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


app.use(cors()); 

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));

// Routes
app.use("/user", userRouter); // ✅ Matches frontend endpoint: /api/user/signup

// Error Handling Middleware
app.use(ErrorMiddleware);

module.exports = { app };
