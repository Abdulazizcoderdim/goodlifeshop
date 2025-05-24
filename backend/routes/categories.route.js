import express from "express";
import categoriesControllesr from "../controllers/categories.controllesr.js";

const router = express.Router();

router.get("/", categoriesControllesr.getAllCategories);

export default router;
