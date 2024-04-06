const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const verifyToken = require("../middleware/auth.middleware");

router.post("/signup", authController.signup);
// Login route with JWT verification middleware
router.post("/login", verifyToken, async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length)
      return res.status(404).json({ detail: "User does not exist." });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    if (!success) return res.status(401).json({ detail: "Login failed" });

    // If JWT verification passed, proceed with login logic
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.json({ email: users.rows[0].email, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
