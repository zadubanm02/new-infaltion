import { cronTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { scrapeTesco } from "./scrape";
import { scrapeKaufland } from "./kaufland-service";

// Scrape tesco products job
client.defineJob({
  id: "scrape-tesco-job",
  name: "Scrape Tesco job: Get products from tesco",
  version: "0.0.1",
  // This is triggered by an event using eventTrigger. You can also trigger Jobs with webhooks, on schedules, and more: https://trigger.dev/docs/documentation/concepts/triggers/introduction
  // trigger: eventTrigger({
  //   name: "scrape.event",
  // }),
  trigger: cronTrigger({
    cron: "30 06 * * 3",
  }),
  run: async (payload, io, ctx) => {
    // Scrape Tesco
    await io.logger.info(`Starting to scrape data from Tesco`);
    const resultTesco = await io.runTask("scrape-tesco-data", async () => {
      scrapeTesco(io);
      return {
        message: "Successfuly scraped",
      };
    });
    await io.logger.info("✨ Data successfuly scraped from Tesco ✨");

    // Scrape Kaufland
    await io.logger.info(`Starting to scrape data from Kaufland`);
    const resultKaufland = await io.runTask(
      "scrape-kaufland-data",
      async () => {
        scrapeKaufland(io);
        return {
          message: "Successfuly scraped",
        };
      }
    );
    await io.logger.info("✨ Data successfuly scraped from Kaufland ✨");

    // // Scrape Lidl
    // await io.logger.info(`Starting to scrape data from Lidl`);
    // const resultLidl = await io.runTask("scrape-tesco-data", async () => {
    //   scrapeTesco(io);
    //   return {
    //     message: "Successfuly scraped",
    //   };
    // });
    // await io.logger.info("✨ Data successfuly scraped from Lidl ✨");

    // await io.logger.info("✨ Data successfuly scraped from all sources ✨");
  },
});
