import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import subcategoryController from "../controllers/subcategory.controller.js";

const router = express.Router();

router.get("/", subcategoryController.getAll);
router.get("/:id", subcategoryController.getOne);
router.post("/", authMiddleware, subcategoryController.create);
router.put("/:id", authMiddleware, subcategoryController.update);
router.delete("/:id", authMiddleware, subcategoryController.delete);

export default router;
