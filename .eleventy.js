const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

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
