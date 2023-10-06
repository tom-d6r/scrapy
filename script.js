import Scraper from "./inc/Scraper.js";
import Importer from "./inc/Importer.js";
import { scraperOptions, importerOptions } from "./configs.js";

const scraper = new Scraper(scraperOptions);
const importer = new Importer(importerOptions);

async function main() {
  const updatedPost = await importer.updateTerms(
    16,
    "specialism_type",
    [4, 5],
    "specialisms"
  );
  const post = await importer.getPostById(16, "specialisms");
  console.log(updatedPost);
}

main();
