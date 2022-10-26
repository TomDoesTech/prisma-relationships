import { createProductsWithCategories } from "./helpers.ts/products";
import { createUser } from "./helpers.ts/user";
import { prisma } from "./db/client";
import { sampleArray } from "./helpers.ts/random";
import { clean } from "./helpers.ts/clean";

/*
 * One to many
 * An order has one user, a user can have many orders
 */

async function createOrder() {
  await clean();

  const products = await createProductsWithCategories();
  const user = await createUser();

  const order = await prisma.order.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      products: {
        connect: sampleArray(products).map((product) => ({
          id: product.id,
        })),
      },
    },
    include: {
      user: true,
    },
  });

  return { order };
}

async function findAllOrders() {
  return prisma.order.findMany({
    include: {
      user: true,
      products: true,
    },
  });
}

console.log("one-to-many");
console.log(await createOrder());

console.log(JSON.stringify(await findAllOrders(), null, 2));
