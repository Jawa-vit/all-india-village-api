const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const prisma = require("../prisma");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({

      data: {
        name,
        email,
        password: hashedPassword
      }

    });

    res.json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration failed"
    });

  }

});

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });

    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });

    }

    // Generate JWT token
    const token = jwt.sign(

      {
        userId: user.id
      },

      "SECRET_KEY",

      {
        expiresIn: "7d"
      }

    );

    res.json({

      success: true,

      message: "Login successful",

      token

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });

  }

});

module.exports = router;