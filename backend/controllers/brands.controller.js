import prisma from "../config/prisma.client.js";

class BrandsController {
  async getAllBrands(req, res, next) {
    try {
      const brands = await prisma.product.findMany({
        where: {
          brand: {
            not: null,
          },
        },
        select: {
          brand: true,
        },
        distinct: ["brand"],
      });

      const brandList = brands.map((item) => item.brand).filter(Boolean);

      res.json({
        success: true,
        data: brandList,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BrandsController();
