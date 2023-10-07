# Introduction

This library/script is used to scrape websites and import them into WordPress sites. It can import to both native WordPress fields, as well as ACF fields.

## Getting Started

1. Run `npm i` from the root of the project
2. Customize the configs.js to your project specific information
3. Scrape and import whatever's needed in the main function in `script.js`
4. Run the script by running `npm run start`

## Usage

### Getting information using the scraper

```js
const pageTitle = scraper.getPageTitle();
const mainContent = scraper.getContentFromSelector("main .container", "html");
```

### Getting information using the importer

```js
const pages = importer.getAllPosts("pages");
const specialism = importer.getPostById(2, "specialism");
```

### Creating posts using the importer

```js
const post = importer.createPost(
  "This is the title",
  "This is the content",
  "specialism"
);
```

### Updating ACF fields using the importer

```js
const post = importer.updatePostField(
  4,
  "field_name",
  "The field content",
  "posts"
);
```

## Classes

### Scraping

All the scraping is done with the `Scraper` class, which can be found in `inc/Scraper.js`. The scraper class takes a simple config, and from there has various methods to scrape sites using `axios` to fetch pages, and `cheerio` to parse the HTML in a jQuery-like syntax.

### Importing

Importing is done using the WordPress REST API. Retrieving information is done with simple GET requests, but to make POST request and create/update data you need to add your username and an application password to the config. [Read more about these in the official WordPress documentation](https://developer.wordpress.org/rest-api/reference/application-passwords/).
