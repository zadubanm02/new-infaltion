import { Request, Response } from "express";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { config } from "../../config";
import { logger } from "../logger";
import { ProductObejct } from "../types/types";

const getProductData = async (req: Request, res: Response) => {
  try {
    puppeteer
      .use(StealthPlugin())
      .launch({
        timeout: 200000,
        headless: true,
        executablePath:
          // set your chromium path for testing just console.log(puppeteer.executablePath()) to find that
          "/Users/michalzadubanpersonal/.cache/puppeteer/chrome/mac-1056772/chrome-mac/Chromium.app/Contents/MacOS/Chromium",
      })
      .then(async (browser) => {
        const page = await browser.newPage();
        let data: ProductObejct[] = [];
        for (const section of config.lidl.sections) {
          await page.goto(section, { waitUntil: "networkidle0" });
          const newData: ProductObejct[] = await page.evaluate(() => {
            const all = document.querySelectorAll(
              "[data-selector=PRODUCT] > div"
            );
            return Array.from(
              document.querySelectorAll("[data-selector=PRODUCT] > div")
            ).map((node) => {
              const data = JSON.parse(
                node.getAttribute("data-grid-data") ?? ""
              );
              return {
                title: data[0].keyfacts.title,
                originalPrice: data[0].price.oldPrice,
                discountedPrice: data[0].price.price,
                discount: data[0].price.discount.percentageDiscount ?? "",
                image: data[0].image,
              };
            });
          });
          data = [...data, ...newData];
        }

        await browser.close();
        res.status(200).json(data);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const lidlService = { getProductData };
