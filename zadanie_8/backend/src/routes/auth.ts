import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "No email of password provided" });
    }

    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as any;

    if (!user || !user.password) {
      return res.status(401).json({ error: "Wrong email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Wrong email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      message: "Logged in successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "No email or password provided" });
    }

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Account with provided email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insert = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)",
    );
    insert.run(email, hashedPassword);

    res
      .status(201)
      .json({ message: "Registered successfully. You may log in now" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
