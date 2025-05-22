import express from "express";
import authController from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 30 }),
  authController.login
);
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 30 }),
  authController.register
);
router.delete("/logout", authMiddleware, authController.logout);
router.get("/refresh", authController.refresh);
router.get("/me", authMiddleware, authController.me);

export default router;
