import { faker } from "@faker-js/faker";
import { prisma } from "../db/client";

export async function createProductsWithCategories() {
  const categories = await prisma.$transaction(
    Array(10)
      .fill(null)
      .map((_, i) => {
        return prisma.category.create({
          data: {
            name: faker.commerce.productAdjective(),
          },
        });
      })
  );

  const products = Array(10)
    .fill(null)
    .map(() => {
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: 100,
          category: {
            connect: {
              id: categories[Math.floor(Math.random() * categories.length)].id,
            },
          },
        },
      });
    });

  return prisma.$transaction(products);
}
