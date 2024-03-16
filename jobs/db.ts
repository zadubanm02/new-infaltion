import { ProductObejct } from "./types";
import { getPrismaClient } from "./prisma";
import { IO } from "@trigger.dev/sdk";

export const createProductsInDb = async (
  products: ProductObejct[],
  io: IO,
  store: string
) => {
  const prisma = getPrismaClient();
  try {
    io.logger.info("Deleting previously saved products");
    // delete rows bc of new scraping
    await prisma.product.deleteMany({
      where: {
        store,
      },
    });

    io.logger.info("Saving new products");

    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });

    io.logger.info("Products saved");
  } catch (error) {
    io.logger.error("Could not insert products", { error });
    throw Error("Could not upload products");
  }
};
