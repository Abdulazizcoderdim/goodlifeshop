import prisma from "../config/prisma.client.js";
import { BaseError } from "../errors/base.error.js";
import generateUniqueSlug from "../shared/generateSlug.js";

class CategoriesController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await prisma.category.findMany();

      res.json({
        success: true,
        content: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneCategory(req, res, next) {
    try {
      const { id } = req.params;

      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category) return next(BaseError.BadRequest("Category not found"));

      res.json({
        success: true,
        content: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const slug = await generateUniqueSlug(name);

      const category = await prisma.category.create({
        data: {
          name,
          slug,
        },
      });

      res.json({
        success: true,
        content: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
        },
      });

      res.json({
        success: true,
        content: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const category = await prisma.category.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: "Категория успешно удалена",
        content: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoriesController();
