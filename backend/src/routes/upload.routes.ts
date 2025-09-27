import express, { Request } from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

router.post("/upload", upload.single("image"), (req, res) => {
  const file = (req as MulterRequest).file;
  if (!file) {
    res.status(400).json({ message: "Không có file nào được upload." });
    return;
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    file.filename
  }`;
  res.status(200).json({ url: imageUrl });
});

export default router;
