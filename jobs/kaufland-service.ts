import { IO } from "@trigger.dev/sdk";
import { getProductDataKaufland } from "./findKaufland";
import { createProductsInDb } from "./db";

export const scrapeKaufland = async (io: IO) => {
  try {
    const products = await getProductDataKaufland();
    if (products) {
      await createProductsInDb(products, io);
    }
    io.logger.info("Kaufland data scraped successfuly");
  } catch (error) {
    io.logger.error("Couldnt scrape or save data", { error });
  }
};
