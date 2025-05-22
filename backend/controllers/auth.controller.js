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

      if (!user) throw BaseError.BadRequest(`Пользователь не вошел в систему`);

      const isPassEqual = await bcrypt.compare(password, user.password);

      if (!isPassEqual) throw BaseError.BadRequest("Пароль неверен.");

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

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) throw BaseError.BadRequest("Refresh token not found");

      res.clearCookies("refreshToken");

      return res.json({ message: "Успешный выход из системы" });
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) throw BaseError.BadRequest("Refresh token not found");

      const data = await authService.refresh(refreshToken);

      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.json({ accessToken: data.accessToken });
    } catch (error) {
      next(error);
    }
  }
  async me(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) throw BaseError.BadRequest("Пользователь не вошел в систему");

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
