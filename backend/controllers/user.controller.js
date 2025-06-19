import prisma from "../config/prisma.client.js";
import { BaseError } from "../errors/base.error.js";

class UserController {
  async getAll(req, res, next) {
    try {
      const { page = 1, size = 10, search } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (pageNumber - 1) * pageSize;

      const where = {};

      if (search) {
        where.OR = [
          { email: { contains: search, mode: "insensitive" } },
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { phoneNumber: { contains: search, mode: "insensitive" } },
        ];
      }

      const [users, totalElements] = await Promise.all([
        prisma.user.findMany({
          skip,
          take: pageSize,
          where,
        }),
        prisma.user.count(),
      ]);

      const totalPages = Math.ceil(totalElements / pageSize);

      res.json({
        content: users,
        pagination: {
          number: pageNumber,
          size: pageSize,
          totalElements,
          totalPages,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) return next(BaseError.BadRequest("User not found"));

      res.json({
        success: true,
        content: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, firstName, lastName, phoneNumber, surname, role } =
        req.body;

      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        omit: { password: true },
      });

      if (!user) throw BaseError.BadRequest("Пользователь не вошел в систему");

      if (user.role !== "ADMIN") throw BaseError.BadRequest("Доступ запрещен");

      if (!id) return next(BaseError.BadRequest("User not found"));

      const updateUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          firstName,
          lastName,
          phoneNumber,
          surname,
          role,
        },
      });

      res.json({
        success: true,
        content: updateUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
