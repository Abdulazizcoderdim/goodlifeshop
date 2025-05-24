import prisma from "../config/prisma.client.js";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // belgilarni olib tashlash
    .replace(/\s+/g, "-") // bo‘sh joyni "-" ga almashtirish
    .replace(/-+/g, "-"); // ketma-ket "-" larni bitta qilish
}

async function generateUniqueSlug(title) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

export default generateUniqueSlug;
