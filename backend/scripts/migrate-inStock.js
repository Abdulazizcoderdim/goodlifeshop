import prisma from "../config/prisma.client.js";

async function main() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    await prisma.product.update({
      where: { id: p.id },
      data: {
        inStock: true,
      },
    });
  }
  console.log("Migration done ✅");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
