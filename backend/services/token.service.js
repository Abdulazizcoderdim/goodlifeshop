import jwt from "jsonwebtoken";
import prisma from "../config/prisma.client.js";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const existToken = await prisma.refreshToken.findFirst({
      where: {
        userId,
      },
    });

    if (existToken) {
      return await prisma.refreshToken.update({
        where: {
          id: existToken.id,
        },
        data: {
          token: refreshToken,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
      });
    }

    return await prisma.refreshToken.create({
      data: {
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        token: refreshToken,
      },
    });
  }

  async removeToken(refreshToken) {
    return await prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
  }

  async findToken(refreshToken) {
    return await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
      },
    });
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
