import express from "express";
import "express-group-routes";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.group("/auth", (router) => {
  router.post("/login", authController.login);
  router.post("/register", authController.register);
  router.post("/logout", authController.logout);
  router.get("/refresh", authController.register);
  router.get("/me", authController.me);
});
