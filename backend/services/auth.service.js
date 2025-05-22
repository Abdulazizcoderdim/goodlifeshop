import prisma from "../config/prisma.client.js";
import { UserDto } from "../dtos/user.dto.js";
import { BaseError } from "../errors/base.error.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";

class AuthService {
  async register(email, password) {
    const isExsistUser = await prisma.user.findUnique({ where: { email } });

    if (isExsistUser) throw BaseError.BadRequest("Foydalanuvchi tizimda bor");

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashPassword },
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async refresh(refreshToken) {
    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);

    if (!userPayload || !tokenDb) throw BaseError.Unauthorized("Invalid token");

    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }
}

export default new AuthService();
