import { slugify as translitSlugify } from "transliteration";
import prisma from "../config/prisma.client.js";

async function generateCategorySlug(title) {
  const baseSlug = translitSlugify(title, { lowercase: true });
  let slug = baseSlug;
  let count = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

export default generateCategorySlug;
