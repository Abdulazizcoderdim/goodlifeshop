import express from "express";
import postsController from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", postsController.getAll);
router.get("/:id", postsController.getOne);
router.put("/:id", postsController.edit);
router.post("/", postsController.create);
router.get("/slug/:slug", postsController.getOneBySlug);

export default router;
