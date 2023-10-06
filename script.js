import Scraper from "./inc/Scraper.js";
import Importer from "./inc/Importer.js";
import { scraperOptions, importerOptions } from "./configs.js";

const scraper = new Scraper(scraperOptions);
const importer = new Importer(importerOptions);

async function main() {}

main();
