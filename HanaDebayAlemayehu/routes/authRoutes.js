const express = require("express");
const path = require("path");
const router = express.Router();

const User = require("../models/userModel");
const { error } = require("console");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email/phone or password" });
    }
    res.redirect("/sucess");
  } catch (error) {
    console.error("Login Error", err);
    res.render("login", { error: "Something went wrong. Please try again." });
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render("signup", { error: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered" });
    }
    const newUser = new User({
      fullname: fullName,
      email,
      phone,
    });
    await newUser.save();
    res.render("signup", { success: true });
  } catch (err) {
    console.error("Signup Error:", err);
    res.render("signup", { error: "Something went wrong. Please try again." });
  }
});

router.get("/sucess", (req, res) => {
  res.render("sucess-page");
});

module.exports = router;
