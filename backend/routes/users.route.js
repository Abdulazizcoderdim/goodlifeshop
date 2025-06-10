import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authMiddleware, userController.getAll);
router.get("/:id", authMiddleware, userController.getOne);
router.post("/", authMiddleware, userController.create);
router.put("/:id", authMiddleware, userController.update);
router.delete("/:id", authMiddleware, userController.delete);

export default router;
