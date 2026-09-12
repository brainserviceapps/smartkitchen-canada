module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the output folder
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Builds FAQPage JSON-LD straight from the same data used to render
  // the visible FAQ accordion, so the two can never drift out of sync.
  eleventyConfig.addFilter("faqSchema", function (sections) {
    const mainEntity = sections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a
        }
      }))
    );
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity
    });
  });

  // Maps a page's URL to its equivalent under a different locale prefix,
  // so the language switcher and hreflang tags can link directly between
  // translated versions of the same page instead of always going home.
  eleventyConfig.addFilter("localizedUrl", function (url, targetLang) {
    let path = url;
    if (path === "/fr" || path.indexOf("/fr/") === 0) {
      path = path.slice(3) || "/";
    } else if (path === "/zh-hant" || path.indexOf("/zh-hant/") === 0) {
      path = path.slice(8) || "/";
    } else if (path === "/zh-hans" || path.indexOf("/zh-hans/") === 0) {
      path = path.slice(8) || "/";
    }
    if (targetLang === "fr") {
      return path === "/" ? "/fr/" : "/fr" + path;
    }
    if (targetLang === "zh-hant") {
      return path === "/" ? "/zh-hant/" : "/zh-hant" + path;
    }
    if (targetLang === "zh-hans") {
      return path === "/" ? "/zh-hans/" : "/zh-hans" + path;
    }
    return path;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
