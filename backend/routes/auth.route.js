import express from "express";
import authController from "../controllers/auth.controller.js";
import { body } from "express-validator";

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
router.post("/logout", authController.logout);
router.get("/refresh", authController.register);
router.get("/me", authController.me);

export default router;
