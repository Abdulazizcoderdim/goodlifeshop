import prisma from "../config/prisma.client.js";

class CategoriesController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await prisma.product.findMany({
        where: {
          category: {
            not: null,
          },
        },
        select: {
          category: true,
        },
        distinct: ["category"],
      });

      const categoryList = categories
        .map((item) => item.category)
        .filter(Boolean);

      res.json({
        success: true,
        data: categoryList,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoriesController();
