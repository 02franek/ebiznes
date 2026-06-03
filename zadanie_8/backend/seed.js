import bcrypt from "bcrypt";
import db from "./src/db.ts";

const seed = async () => {
  const hashedPassword = await bcrypt.hash("password", 10);
  const insert = db.prepare(
    "INSERT INTO users (email, password) VALUES (?, ?)",
  );
  insert.run("admin@admin.com", hashedPassword);
  console.log("Test user added: (admin@admin.com, password)");
};

seed();
