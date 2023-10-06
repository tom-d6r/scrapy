const pageTitle = await scraper.getPageTitle();
const pageContent = await scraper.getContentFromSelector(
  ".page-content",
  "html",
  ".read-more-wrapper"
);

const post = await importer.createPost(pageTitle, "", "specialisms");
const updatedPost = await importer.updatePostField(
  post.id,
  "content",
  pageContent,
  "specialisms"
);
