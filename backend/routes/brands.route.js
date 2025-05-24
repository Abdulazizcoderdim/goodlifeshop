import express from "express";
import brandsController from "../controllers/brands.controller.js";

const router = express.Router();

router.get("/", brandsController.getAllBrands);

export default router;
