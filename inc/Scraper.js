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
   * @param {boolean} firstOnly
   * @param {boolean} getParent
   * @param {string} nextUntil
   * @returns The content in the specified type.
   */
  async getContentFromSelector(
    selector,
    type,
    firstOnly = false,
    getParent = false,
    nextUntil = ""
  ) {
    try {
      let content;
      const $ = await this.getCheerioPage(this.url);

      if (nextUntil) {
        content = $(selector).nextUntil(nextUntil);
      } else {
        content = $(selector);
      }

      if (getParent) {
        content = content.parent();
      }

      switch (type) {
        case "html":
          if (firstOnly) {
            return content.html();
          }

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

          // Otherwise we just return the html from the selected node.
          return content.html();
        default:
          if (firstOnly) {
            return content.first().text().trim();
          }

          return content.text().trim();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Scraper;
