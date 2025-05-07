const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { UserModel } = require("../model/userSchema");
const ErrorHandler = require("../utils/Errorhandler");
const { sendMail } = require("../utils/mail");
const catchAsyncError = require("../middleware/catchAsyncError");
require("dotenv").config();

const userRouter = express.Router();
const otpStore = new Map();

userRouter.post("/signup", catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return next(new ErrorHandler("Invalid email format", 400));
    }

    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
        return next(new ErrorHandler("Password must be at least 8 characters and contain one letter and one number", 400));
    }

    let user = await UserModel.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore.set(email, { otp, name, hashedPassword, expiresAt: Date.now() + 5 * 60 * 1000 });

    await sendOTP(email, otp);

    res.status(200).json({ success: true, message: "OTP sent to your email" });
}));

async function sendOTP(email, otp) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_NAME,
                pass: process.env.ADMIN_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // 👈 allow self-signed certs
            },
        });
        

        await transporter.sendMail({
            from: `ShareOCar <${process.env.ADMIN_NAME}>`,
            to: email,
            subject: "Your OTP for Signup",
            text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
        });

    } catch (error) {
        console.error("Error sending email:", error);
        throw new ErrorHandler("Failed to send OTP", 500);
    }
}

userRouter.post("/verify-otp", catchAsyncError(async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const storedData = otpStore.get(email);
    if (!storedData || Date.now() > storedData.expiresAt) {
        otpStore.delete(email);
        return next(new ErrorHandler("OTP expired or not requested", 400));
    }

    if (storedData.otp !== otp) {
        return next(new ErrorHandler("Invalid OTP", 400));
    }

    const newUser = new UserModel({
        name: storedData.name,
        email,
        password: storedData.hashedPassword,
        isActivated: true,
    });

    await newUser.save();
    otpStore.delete(email);

    res.status(200).json({ success: true, message: "Signup successful" });
}));

userRouter.post("/login", catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user || !user.isActivated) {
        return next(new ErrorHandler("Please signup", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Incorrect password", 400));
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "30d",
    });

    res.cookie("accesstoken", token, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

    res.status(200).json({ success: true, message: "Login successful" });
}));

module.exports = { userRouter };
