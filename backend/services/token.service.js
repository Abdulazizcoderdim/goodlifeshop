import jwt from "jsonwebtoken";
import prisma from "../config/prisma.client";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken){
    const existToken = await prisma
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
