import * as cheerio from "cheerio";
import { config } from "./config";

const url = config.kaufland.url;

export interface ProductObejct {
  title: string;
  discount: number;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
  store: string;
}

export const getProductDataKaufland = async () => {
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

      return fetch(finalUrl, init)
        .then(async (res) => {
          const text = await res.text();
          const $ = cheerio.load(text);
          $(".o-overview-list__item-inner").each((index, element) => {
            const title = $(element)
              .find(".m-offer-tile__text > .m-offer-tile__subtitle")
              .text()
              .trim();

            const discount = $(element)
              .find(".a-pricetag__discount")
              .text()
              .trim()
              .substring(1, 3);
            const originalPrice = $(element)
              .find(".a-pricetag__old-price")
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
              title: title ?? "title",
              discount: discount ? parseInt(discount) : 0,
              discountedPrice: discountedPrice
                ? parseFloat(discountedPrice.replace(",", "."))
                : 0.0,
              originalPrice: originalPrice
                ? parseFloat(originalPrice.replace(",", "."))
                : 0.0,
              imageUrl: imageUrl ?? "",
              store: "Kaufland",
            });
          });
          return data;
        })
        .catch((e) => {
          console.log("Error");
        });
    }
  } catch (error) {
    throw error;
  }
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
