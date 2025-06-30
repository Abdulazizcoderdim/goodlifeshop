import prisma from "../config/prisma.client.js";
import { BaseError } from "../errors/base.error.js";

class PostsController {
  async getAll(req, res, next) {
    try {
      const { page = 1, size = 10, search, category } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (pageNumber - 1) * pageSize;

      // Qanday enum qiymatlar ruxsat etilganligini qo‘lda yozamiz:
      const validCategories = ["recipes", "brand_history", "usage_and_care"];

      const where = {};

      if (search && category) {
        where.AND = [
          {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              validCategories.includes(search)
                ? { category: { equals: search } }
                : undefined, // noto‘g‘ri enum bo‘lsa, hech narsa qo‘shilmaydi
            ].filter(Boolean),
          },
          { category: category },
        ];
      } else if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          validCategories.includes(search)
            ? { category: { equals: search } }
            : undefined,
        ].filter(Boolean);
      } else if (category) {
        where.category = category;
      }

      const [posts, totalElements] = await Promise.all([
        prisma.post.findMany({
          skip,
          take: pageSize,
          where,
        }),
        prisma.post.count({
          where,
        }),
      ]);

      const totalPages = Math.ceil(totalElements / pageSize);

      res.json({
        content: posts,
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

      const post = await prisma.post.findUnique({
        where: { id },
      });

      if (!post) return next(BaseError.BadRequest("Post not found"));

      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const post = await prisma.post.create({
        data: req.body,
      });

      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) return next(BaseError.BadRequest("Post not found"));

      const post = await prisma.post.update({
        where: { id },
        data: req.body,
      });

      res.json(post);
    } catch (error) {
      next(error);
    }
  }
}

export default new PostsController();
