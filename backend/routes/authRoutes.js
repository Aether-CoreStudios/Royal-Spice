const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const router = express.Router();

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

/* TEMP PASSWORD RESET ROUTE */
router.get("/reset-admin-password", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.updateOne(
      { email: "karthickdhoni80@gmail.com" },
      { $set: { password: hashedPassword } },
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
