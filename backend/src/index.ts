import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 0;

app.use(express.json());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Connect Database Success http://localhost:${PORT}`);
  });
});
