import * as cheerio from "cheerio";
import { config } from "./config";
import { IO } from "@trigger.dev/sdk";

const url = config.kaufland.url;

export interface ProductObejct {
  title: string;
  discount: number;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
  store: string;
}

export const getProductDataKaufland = async (io: IO) => {
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  };
  console.log("Init");
  try {
    let data: ProductObejct[] = [];
    for (const path of config.kaufland.paths) {
      // fetch url
      const finalUrl = `${url}${path}`;
      io.logger.info("URL scrapping kaufland", { finalUrl });

      return fetch(finalUrl, init)
        .then(async (res) => {
          const text = await res.text();
          const $ = cheerio.load(text);
          $(".o-overview-list__item-inner").each((index, element) => {
            const mainTitle = $(element)
              .find(".m-offer-tile__subtitle")
              .text()
              .trim();
            const title = $(element)
              .find(".m-offer-tile__text > .m-offer-tile__title")
              .text()
              .trim();

            const discount = $(element)
              .find(".a-pricetag__discount")
              .text()
              .trim()
              .substring(1, 4);
            const originalPrice = $(element)
              .find(".a-pricetag__old-price")
              .first()
              .text()
              .trim();
            const discountedPrice = $(element)
              .find(".a-pricetag__price")
              .text()
              .trim();
            const imageUrl = $(element)
              .find(".a-image-responsive")
              .attr("data-src");
            data.push({
              title: mainTitle + " " + composeTitle(title),
              discount: discount ? parseInt(discount) : 0,
              discountedPrice: composePrice(discountedPrice, io),
              originalPrice: composePrice(originalPrice, io),
              imageUrl: imageUrl ?? "img",
              store: "Kaufland",
            });
            io.logger.info("ITEM", {
              title: title,
              discount: discount,
              discountedPrice: discountedPrice,
              originalPrice: originalPrice,
              imageUrl: imageUrl ?? "img",
              store: "Kaufland",
            });
          });
          return data;
        })
        .catch((e) => {
          io.logger.error("Error scrapping kaufland", { e });
          console.log("Error");
        });
    }
  } catch (error) {
    io.logger.error("All get products fail", { error });
    throw error;
  }
};

function composeTitle(title?: string) {
  if (title === "" || title === undefined) {
    return "title";
  }
  return title;
}

const composePrice = (price: string | null | undefined, io: IO) => {
  if (price) {
    io.logger.info("I Have price", { price });

    if (price === "") {
      return 0.0;
    }
    if (price === "iba\n                \n                \n            iba") {
      io.logger.info("Iba", { price });
      return 0.0;
    }
    if (price === "iba") {
      io.logger.info("Iba", { price });
      return 0.0;
    }
    return parseFloat(price.replace(",", "."));
  }
  if (price === "") {
    io.logger.info("Empty string", { price });
    return 0.0;
  }
  if (price === "iba") {
    io.logger.info("Iba", { price });
    return 0.0;
  }

  io.logger.info("Returning null", { price });
  return 0.0;
};

//   const newData = await page.evaluate(() =>
//     Array.from(document.querySelectorAll(".m-offer-tile")).map(
//       (node) => {
//         return {
//           title:
//             node.querySelector(".m-offer-tile__subtitle")
//               ?.textContent ??
//             "" +
//               node.querySelector(".m-offer-tile__title")?.textContent ??
//             "",
//           originalPrice: node
//             .querySelector(".a-pricetag__old-price")
//             ?.textContent?.trim(),
//           discountedPrice: node
//             .querySelector(".a-pricetag__price")
//             ?.textContent?.trim(),
//           discount: node
//             .querySelector(".a-pricetag__discount")
//             ?.textContent?.trim(),
//           image: node.querySelector("img")?.src,
//         };
//       }
//     )
//   );
//  data = [...data, ...newData];
