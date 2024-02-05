const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Filters
  eleventyConfig.addFilter("json_stringify", (data) => {
    return JSON.stringify(data, null, "<br>");
  });

  // Layouts
  eleventyConfig.addLayoutAlias(
    "blog-frontpage",
    "layouts/blog-frontpage.liquid",
  );
  eleventyConfig.addLayoutAlias("default", "layouts/default.liquid");
  eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");
  eleventyConfig.addLayoutAlias("post", "layouts/post.liquid");

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
