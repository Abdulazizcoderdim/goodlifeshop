import prisma from "../config/prisma.client.js";
import generateUniqueSlug from "../shared/generateSlug.js";

class ProductController {
  async getAll(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        category,
        brand,
        minPrice,
        maxPrice,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);

      //   build where clase
      const where = {};

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
        ];
      }

      if (category) where.category = category;
      if (brand) where.brand = brand;

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      //   get products with variants
      const products = await prisma.product.findMany({
        where,
        include: {
          variants: true,
          category: true,
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: parseInt(limit),
      });

      //   get total count for pagination
      const total = await prisma.product.count({ where });

      res.json({
        content: products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          variants: true,
          category: true,
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        content: product,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const {
        title,
        description,
        article,
        brand,
        series,
        originCountry,
        price,
        categoryId,
        color,
        dishwasherSafe,
        batteryRequired,
        characteristics,
        dimensions,
        images,
        variants,
      } = req.body;
      // const user = req.user;
      // if (user.role !== "ADMIN")
      //   return res.status(403).json({ message: "Forbidden" });

      const finalSlug = await generateUniqueSlug(title);

      // create product
      const product = await prisma.product.create({
        data: {
          title,
          slug: finalSlug,
          description,
          article,
          brand,
          series,
          originCountry,
          price,
          category: {
            connect: {
              id: categoryId,
            },
          },

          color,
          dishwasherSafe,
          batteryRequired,
          characteristics,

          // nested type
          dimensions,
          // product images
          images,
          // product variants
          variants: {
            create: variants,
          },
        },
        include: {
          variants: true,
          category: true,
        },
      });

      res
        .status(201)
        .json({ message: "Продукт успешно создан", content: product });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        price,
        brand,
        category,
        series,
        country,
        material,
        color,
        weight,
        dimensions,
        dishwasherSafe,
        batteryRequired,
        features,
        images,
      } = req.body;

      // Check if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Update product
      const product = await prisma.product.update({
        where: { id },
        data: {
          title,
          description,
          price: parseFloat(price),
          brand,
          category,
          series,
          country,
          material,
          color,
          weight: weight ? parseFloat(weight) : null,
          dimensions,
          dishwasherSafe,
          batteryRequired,
          features,
          images,
        },
        include: {
          variants: true,
        },
      });

      res.json({
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Delete all variants first (cascade delete)
      await prisma.variant.deleteMany({
        where: { productId: id },
      });

      // Delete the product
      await prisma.product.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          variants: true,
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getVariants(req, res, next) {
    try {
      const { productId } = req.params;

      const variants = await prisma.variant.findMany({
        where: { productId },
        include: {
          product: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      });

      res.json({
        success: true,
        data: variants,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
