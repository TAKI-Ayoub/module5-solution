// Based on the assignment solution
(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    var result = string.replace(new RegExp(propToReplace, "g"), propValue);
    return result;
  };

  var chooseRandomCategory = function (categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  var showHome = function (homeHtml) {
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        var randomCategory = chooseRandomCategory(categories);
        var randomCategoryShortName = randomCategory.short_name;
        var homeHtmlToInsertIntoMainPage = insertProperty(
          homeHtml,
          "randomCategoryShortName",
          "'" + randomCategoryShortName + "'"
        );
        insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
      },
      true
    );
  };

  dc.loadHomePage = function () {
    $ajaxUtils.sendGetRequest(homeHtmlUrl, showHome, false);
  };

  global.$dc = dc;
})(window);
