import Scraper from "./inc/Scraper.js";
import Importer from "./inc/Importer.js";
import { scraperOptions, importerOptions } from "./configs.js";
import { wait } from "./inc/Utils.js";

const importer = new Importer(importerOptions);
const urls = [];

async function main() {
  for (const url of urls) {
    const scraper = new Scraper({ ...scraperOptions });
    await wait(1000);
  }
}

await main();
console.log("Finished script");
