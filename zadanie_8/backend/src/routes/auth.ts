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

router.get("/google", (req, res) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: "http://localhost:5000/api/auth/google/callback",
    response_type: "code",
    scope: "email profile",
  });

  res.redirect(`${rootUrl}?${options.toString()}`);
});

router.get("/google/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        redirect_uri: "http://localhost:5000/api/auth/google/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) throw new Error("Error getting token from Google");

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );
    const googleUser = await userResponse.json();

    let user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(googleUser.email) as any;

    if (!user) {
      const insert = db.prepare(`
        INSERT INTO users (email, provider, provider_id) 
        VALUES (?, 'google', ?)
      `);
      const result = insert.run(googleUser.email, googleUser.id);
      user = { id: result.lastInsertRowid, email: googleUser.email };
    } else if (user.provider !== "google") {
      db.prepare(
        "UPDATE users SET provider = 'google', provider_id = ? WHERE email = ?",
      ).run(googleUser.id, googleUser.email);
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

    res.redirect("http://localhost:5173");
  } catch (error) {
    console.error("OAuth2 Google Error:", error);
    res.redirect("http://localhost:5173?error=oauth_failed");
  }
});

router.get("/me", (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "No session" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.get("/github", (req, res) => {
  const rootUrl = "https://github.com/login/oauth/authorize";
  const options = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: "http://localhost:5000/api/auth/github/callback",
    scope: "user:email",
  });

  res.redirect(`${rootUrl}?${options.toString()}`);
});

router.get("/github/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID!,
          client_secret: process.env.GITHUB_CLIENT_SECRET!,
          code,
          redirect_uri: "http://localhost:5000/api/auth/github/callback",
        }),
      },
    );

    const tokenData = await tokenResponse.json();
    if (tokenData.error) throw new Error(tokenData.error_description);

    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const githubUser = await userResponse.json();

    let email = githubUser.email;
    if (!email) {
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const emails = await emailResponse.json();
      const primaryEmail = emails.find((e: any) => e.primary);
      email = primaryEmail ? primaryEmail.email : null;
    }

    if (!email) {
      throw new Error("Could not get email address from Github");
    }

    let user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as any;

    if (!user) {
      const insert = db.prepare(`
        INSERT INTO users (email, provider, provider_id) 
        VALUES (?, 'github', ?)
      `);
      const result = insert.run(email, githubUser.id.toString());
      user = { id: result.lastInsertRowid, email };
    } else if (user.provider !== "github") {
      db.prepare(
        "UPDATE users SET provider = 'github', provider_id = ? WHERE email = ?",
      ).run(githubUser.id.toString(), email);
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

    res.redirect("http://localhost:5173");
  } catch (error) {
    console.error("OAuth2 GitHub Error:", error);
    res.redirect("http://localhost:5173?error=github_oauth_failed");
  }
});

export default router;
