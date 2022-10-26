import { faker } from "@faker-js/faker";
import { prisma } from "./db/client";
import { clean } from "./helpers.ts/clean";
import { sampleArray } from "./helpers.ts/random";

/*
 * many-to-many
 * A product can have multiple categories and a category can belong to multiple products
 */

async function createProductsWithCategories() {
  await clean();

  const categoriesPromises = Array(10)
    .fill(null)
    .map(() => {
      return prisma.category.create({
        data: {
          name: faker.commerce.productAdjective(),
        },
      });
    });

  const categories = await prisma.$transaction(categoriesPromises);

  const productsPromises = Array(10)
    .fill(null)
    .map(() => {
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: 100,
          category: {
            connect: [
              {
                id: categories[Math.floor(Math.random() * categories.length)]
                  .id,
              },
              {
                id: categories[Math.floor(Math.random() * categories.length)]
                  .id,
              },
            ],
          },
        },
        include: {
          category: true,
        },
      });
    });

  return prisma.$transaction(productsPromises);
}

console.log("many-to-many");
console.log(JSON.stringify(await createProductsWithCategories(), null, 2));
