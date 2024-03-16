import { IO } from "@trigger.dev/sdk";
import { getProductDataKaufland } from "./findKaufland";
import { createProductsInDb } from "./db";

export const scrapeKaufland = async (io: IO) => {
  try {
    const products = await getProductDataKaufland(io);
    if (products) {
      io.logger.info("Products", { products });
      await createProductsInDb(products, io, "Kaufland");
    }
    io.logger.info("Kaufland data scraped successfuly");
  } catch (error) {
    io.logger.error("Couldnt scrape or save data", { error });
  }
};
