/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { IO } from "@trigger.dev/sdk";
import { config } from "./config";
import { findProducts } from "./tesco-service";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const url = config.tesco.url;

export const scrapeTesco = (io: IO) => {
  try {
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    };
    fetch(url, init)
      .then((value) => {
        value
          .text()
          .then(async (text) => {
            const products = await findProducts(text, io);
            io.logger.info("Products", { products });
          })
          .catch((error) => {
            io.logger.error("Error cheerio", { error });
          });
      })
      .catch((error) => {
        io.logger.error("Error scraping", { error });
      });
  } catch (error) {
    io.logger.error("Error fetching", { error });
  }
};
