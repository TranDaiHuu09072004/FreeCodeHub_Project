import { Router } from "express";
import { getAllUsers } from "../controllers/user.control";

const router = Router();

router.get("/users", getAllUsers);

export default router;
