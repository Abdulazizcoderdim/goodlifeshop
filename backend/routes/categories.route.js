import express from "express";
import categoriesControllesr from "../controllers/categories.controllesr.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", categoriesControllesr.getAllCategories);
router.get("/:slug", categoriesControllesr.getCategorySlug);
router.get("/:id", categoriesControllesr.getOneCategory);
router.post("/", authMiddleware, categoriesControllesr.createCategory);
router.put("/:id", authMiddleware, categoriesControllesr.updateCategory);
router.delete("/:id", authMiddleware, categoriesControllesr.deleteCategory);

export default router;
