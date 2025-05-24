import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", productController.getAll);
router.post("/", authMiddleware, productController.create);
router.get("/:id", productController.getOne);
router.get("/slug/:slug", productController.getOneBySlug);
router.put("/:id", authMiddleware, productController.update);
router.delete("/:id", authMiddleware, productController.delete);
router.get('/:productId/variants', productController.getVariants);

export default router;
