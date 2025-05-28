import prisma from "../config/prisma.client.js";
import { BaseError } from "../errors/base.error.js";
import generateSubcategorySlug from "../shared/generateSubcategorySlug.js";

class SubCategoryController {
  async getAll(req, res, next) {
    try {
      const { page = 1, size = 10 } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (pageNumber - 1) * pageSize;

      const [subcategories, totalElements] = await Promise.all([
        prisma.subcategory.findMany({
          skip,
          take: pageSize,
          include: {
            category: true,
          },
        }),
        prisma.subcategory.count(),
      ]);

      if (!subcategories)
        return next(BaseError.BadRequest("Subcategories not found"));

      const totalPages = Math.ceil(totalElements / pageSize);

      res.json({
        content: subcategories,
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

      const subcategory = await prisma.subcategory.findUnique({
        where: { id },
      });

      if (!subcategory)
        return next(BaseError.BadRequest("Subcategory not found"));

      res.json({
        success: true,
        content: subcategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const { name, categoryId, description, imageUrl } = req.body;

      const slug = await generateSubcategorySlug(name);

      const subcategory = await prisma.subcategory.create({
        data: {
          name,
          slug,
          description,
          imageUrl,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
        include: {
          category: true,
        },
      });

      res.json({
        success: true,
        content: subcategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, categoryId, description, imageUrl } = req.body;

      const subcategory = await prisma.subcategory.update({
        where: { id },
        data: {
          name,
          description,
          imageUrl,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
        include: {
          category: true,
        },
      });

      res.json({
        success: true,
        content: subcategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await prisma.$transaction([
        prisma.product.deleteMany({
          where: { subcategoryId: id },
        }),

        prisma.subcategory.delete({
          where: { id },
        }),
      ]);

      res.json({
        success: true,
        message: "Подкатегория успешно удалена",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubCategoryController();
