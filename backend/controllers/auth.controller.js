import { validationResult } from "express-validator";
import prisma from "../config/prisma.client.js";
import { UserDto } from "../dtos/user.dto.js";
import { BaseError } from "../errors/base.error.js";
import tokenService from "../services/token.service.js";
import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";

class AuthController {
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return next(BaseError.BadRequest("Validation error", errors.array()));

      const { email, password } = req.body;

      const isExsist = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!isExsist) throw BaseError.BadRequest(`Foydalanuvchi tizimda yo'q`);

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) throw BaseError.BadRequest(`Foydalanuvchi tizimda yo'q`);

      const isPassEqual = await bcrypt.compare(password, user.password);

      if (!isPassEqual) throw BaseError.BadRequest("Parol noto'g'ri");

      const userDto = new UserDto(user);

      const tokens = tokenService.generateToken({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.json({ accessToken: tokens.accessToken });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return next(BaseError.BadRequest("Validation error", errors.array()));

      const { email, password } = req.body;

      const data = await authService.register(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.json({ accessToken: data.accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {}
  async refresh(req, res) {}
  async me(req, res) {}
}

export default new AuthController();
