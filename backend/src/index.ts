import dotenv from "dotenv";
dotenv.config();

import express from "express";

import connectDB from "./config/db";
import app from "./app";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Connect Database Success http://localhost:${PORT}`);
  });
});
