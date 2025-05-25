import prisma from "../config/prisma.client.js";
import { BaseError } from "../errors/base.error.js";
import generateSubcategorySlug from "../shared/generateSubcategorySlug.js";

class SubCategoryController {
  async getAll(req, res, next) {
    try {
      const subcategories = await prisma.subcategory.findMany();

      if (!subcategories)
        return next(BaseError.BadRequest("Subcategories not found"));

      res.json({
        success: true,
        content: subcategories,
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
      const { name, categoryId } = req.body;

      const slug = await generateSubcategorySlug(name);

      const subcategory = await prisma.subcategory.create({
        data: {
          name,
          slug,
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
      const { name } = req.body;

      const subcategory = await prisma.subcategory.update({
        where: { id },
        data: {
          name,
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

      const subcategory = await prisma.subcategory.delete({
        where: { id },
      });

      res.json({
        success: true,
        content: subcategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubCategoryController();
