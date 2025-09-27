import dotenv from "dotenv";
dotenv.config();

import express from "express";

import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Connect Database Success http://localhost:${PORT}`);
  });
});
