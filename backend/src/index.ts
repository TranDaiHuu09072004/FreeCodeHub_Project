import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db";
import app from "./app";
import authRouter from "./routes/auth.routes";
dotenv.config();

const PORT = process.env.PORT || 0;

app.use(express.json());

app.use("/api/auth", authRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Connect Database Success http://localhost:${PORT}`);
  });
});
