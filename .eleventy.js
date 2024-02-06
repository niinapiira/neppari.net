const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyRelatedPlugin = require("eleventy-plugin-related");

const months = [
  "tammikuuta",
  "helmikuuta",
  "maaliskuuta",
  "huhtikuuta",
  "toukokuuta",
  "kesäkuuta",
  "heinäkuuta",
  "elokuuta",
  "syyskuuta",
  "lokakuuta",
  "marraskuuta",
  "joulukuuta",
];

// Adapted from https://stackoverflow.com/a/5002161
const stripHtml = (str) => str.replace(/<\/?[^>]+(>|$)/g, "");

// Adapted from https://stackoverflow.com/a/10805198
const stringNewlines = (str) => str.replace(/(\r\n|\n|\r)/gm, "");

const related = eleventyRelatedPlugin.related({
  serializer: ({ title, content }) => [title, content],
  weights: [1, 1],
});

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Filters
  eleventyConfig.addFilter("json_stringify", (data) => {
    return JSON.stringify(data, null, "<br>");
  });

  eleventyConfig.addFilter("nice_fi_date", (d) => {
    return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addFilter("add_content", (obj, content) => ({
    content: stringNewlines(stripHtml(content)),
    ...obj,
  }));

  eleventyConfig.addFilter("relatedPosts", (currentPost, collectionOfPosts) => {
    const allPosts = collectionOfPosts.map(({ data, content, url, date }) => ({
      title: data["page-title"],
      content: stringNewlines(stripHtml(content)),
      url,
      date,
    }));
    const allRelatedPosts = related(currentPost, allPosts)
      .filter(({ relative }) => relative > 0.1)
      .map(({ document }) => document);
    const threeMostRelativePosts = allRelatedPosts.slice(0, 3);
    return threeMostRelativePosts;
  });

  // Layouts
  eleventyConfig.addLayoutAlias(
    "blog-frontpage",
    "layouts/blog-frontpage.html",
  );
  eleventyConfig.addLayoutAlias("default", "layouts/default.html");
  eleventyConfig.addLayoutAlias("page", "layouts/page.html");
  eleventyConfig.addLayoutAlias("post", "layouts/post.html");

  // SASS watching
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Statics
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("tiedostot");
  eleventyConfig.addPassthroughCopy("uploaded-images");

  // Collections
  eleventyConfig.addCollection("posts", function (collectionAPI) {
    const arr = collectionAPI
      .getFilteredByGlob("./blogi/*.md")
      .sort(function (a, b) {
        return b.date - a.date;
      });
    return arr;
  });

  return {
    dir: {
      input: "./", // Equivalent to Jekyll's source property
      output: "./_site", // Equivalent to Jekyll's destination property
    },
    dynamicPartials: false,
  };
};
