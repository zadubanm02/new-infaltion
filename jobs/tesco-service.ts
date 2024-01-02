import * as cheerio from "cheerio";
import { ProductObejct } from "./types";
import { createProductsInDb } from "./db";
import { IO } from "@trigger.dev/sdk";

export const findProducts = async (text: string, io: IO) => {
  try {
    const products: ProductObejct[] = [];
    const $ = cheerio.load(text);
    $(".a-productListing__productsGrid__element").each((index, element) => {
      const title = $(element).find(".product__name").text();
      const discount = $(element)
        .find(".discount-percentage__text")
        .text()
        .trim()
        .substring(1, 3);
      const originalPrice = $(element)
        .find(".product__discount-normal-price")
        .text()
        .trim();
      const discountedPrice = $(element)
        .find(".price__left-part")
        .text()
        .trim();
      const imageUrl =
        "https://tesco.sk" +
        $(element).find(".product__img-holder > img").attr("src");
      const strippedImageUrl = imageUrl.replace("lq/", "");

      if (title && discount && discountedPrice && originalPrice && imageUrl) {
        products.push({
          title: title ?? "title",
          discount: discount ? parseInt(discount) : 0,
          discountedPrice: discountedPrice
            ? parseFloat(discountedPrice.replace(",", "."))
            : 0.0,
          originalPrice: originalPrice
            ? parseFloat(originalPrice.replace(",", "."))
            : 0.0,
          imageUrl: strippedImageUrl ?? "img",
          store: "Tesco",
        });
      }
    });

    await createProductsInDb(products, io);
    return products;
  } catch (error) {
    io.logger.error("Error in scrapper", { error });
    throw new Error("Could not scrape");
  }
};
