const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // hash the password and if email, username are valuid Hash the password and save the info
    if (!email || !username || !password) {
      return res.status(400).json({ error: "all Fields are required." });
    }
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(409).json({ error: "Email already exists" });
    }
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(409).json({ error: "Username already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      username: username,
      password: hash,
    });
    await user.save();
    return res.status(201).json({ message: "Successfully registered" });
  } catch (err) {
    console.error("Registration error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
