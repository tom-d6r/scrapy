import axios from "axios";
import * as cheerio from "cheerio";

class Scraper {
  constructor({ url }) {
    this.url = url;
  }

  /**
   * Returns a Cheerio page that you can query using selectors.
   * @returns A page parsed by Cheerio.
   */
  async getCheerioPage() {
    try {
      const res = await axios.get(this.url);
      const $ = cheerio.load(res.data);
      return $;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get the first h1 tag on the page.
   * @returns The text from the first h1 on the page.
   */
  async getPageTitle() {
    try {
      const $ = await this.getCheerioPage(this.url);
      const title = $("h1").first().text();
      return title;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get the content for a specific selector.
   * @param {string} selector
   * @param {string} type
   * @returns The content in the specified type.
   */
  async getContentFromSelector(selector, type, nextUntil) {
    try {
      const $ = await this.getCheerioPage(this.url);

      let content;
      if (nextUntil) {
        content = $(selector).nextUntil(nextUntil);
      } else {
        content = $(selector);
      }

      switch (type) {
        case "html":
          let html = "";

          content.contents().each((index, element) => {
            const htmlTag = element.parentNode.name;
            let data = element.data;

            if (data) {
              data = data.trim();
              html += `<${htmlTag}>${data}</${htmlTag}>`;
            }
          });

          return html;
        default:
          return content.first().text().trim();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Scraper;
