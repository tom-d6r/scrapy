import Scraper from "./inc/Scraper.js";
import Importer from "./inc/Importer.js";
import { scraperOptions, importerOptions } from "./configs.js";
import { wait } from "./inc/Utils.js";
import { specialismUrls } from "./etz/specialisms.js";

const importer = new Importer(importerOptions);

async function main() {
  for (const url of specialismUrls) {
    const scraper = new Scraper({ ...scraperOptions, url });
    const pageTitle = await scraper.getPageTitle();
    const postExists = await importer.checkIfPostExists(
      pageTitle,
      "specialisms"
    );

    if (postExists) {
      continue;
    }

    const pageContent = await scraper.getContentFromSelector(
      ".page-content",
      "html"
    );

    const post = await importer.createPost(pageTitle, "", "specialisms");
    const updatedPost = await importer.updatePostField(
      post.id,
      "content",
      pageContent,
      "specialisms"
    );
    console.log(`Created post with ID ${updatedPost.id}`);
    await wait(1000);
  }
}

await main();
console.log("Finished script");
