import prisma from "../config/prisma.client.js";
import { BaseError } from "../errors/base.error.js";
import generateCategorySlug from "../shared/generateCategorySlug.js";

class CategoriesController {
  async getAllCategories(req, res, next) {
    try {
      const { page = 1, size = 10 } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (pageNumber - 1) * pageSize;

      const [categories, totalElements] = await Promise.all([
        prisma.category.findMany({
          skip,
          take: pageSize,
          include: {
            subcategories: true,
            _count: {
              select: {
                products: true,
                subcategories: true,
              },
            },
          },
        }),
        prisma.category.count(),
      ]);

      const totalPages = Math.ceil(totalElements / pageSize);

      res.json({
        content: categories,
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
      const { name, imageUrl } = req.body;

      const slug = await generateCategorySlug(name);

      const category = await prisma.category.create({
        data: {
          name,
          slug,
          imageUrl,
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
      const { name, imageUrl } = req.body;

      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
          imageUrl,
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

      await prisma.$transaction([
        prisma.subcategory.deleteMany({
          where: { categoryId: id },
        }),
        prisma.product.deleteMany({
          where: { categoryId: id },
        }),
        prisma.category.delete({
          where: { id },
        }),
      ]);

      res.json({
        success: true,
        message: "Категория успешно удалена",
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategorySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const { page = 1, size = 10 } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (pageNumber - 1) * pageSize;

      const category = await prisma.category.findUnique({
        where: { slug: slug },
        include: {
          subcategories: true,
        },
      });

      if (!category) return next(BaseError.BadRequest("Category not found"));

      const [products, totalElements] = await Promise.all([
        prisma.product.findMany({
          where: { categoryId: category.id },
          skip,
          take: pageSize,
        }),
        prisma.product.count({
          where: { categoryId: category.id },
        }),
      ]);

      const totalPages = Math.ceil(totalElements / pageSize);

      res.json({
        category: category,
        content: products,
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
}

export default new CategoriesController();
