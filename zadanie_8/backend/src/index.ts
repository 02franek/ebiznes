import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./db.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server's healthy",
  });
});

app.listen(PORT, () => {
  console.log(`Server's listening on http://localhost:${PORT}`);
});
