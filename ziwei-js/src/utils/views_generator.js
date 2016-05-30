_Ziwei_Models_ResultPalace.prototype.renderHtml = function(templateSource, useFullNames = true) {
  var buildMainStarName = function(star, useFullNames = true) {
    var starName = useFullNames ? star.getFullName('ForteenMainStars') : star.getShortName('ForteenMainStars');
    return starName + " (V)";
  };

  var renderStarsHtml = function(stars, customClass, useFullNames = true, isMainStars = true) {
    var source = '<span class="' + `${customClass}` + '">{{ star }}</span>';
    var template = Handlebars.compile(source);
    var html = stars.map((star) => {
      var starName = useFullNames ? star.getFullName() : star.getShortName();
      
      if (isMainStars)
        starName = buildMainStarName(star, useFullNames);

      return template({star: starName});
    }).join("");

    return html;
  };

  var context = useFullNames ? this.getFullNames() : this.getShortNames();
  context.mainStars = renderStarsHtml(this.mainStars, 'main-star', useFullNames);
  context.goodStars = renderStarsHtml(this.goodStars, 'good-star', useFullNames, false);
  context.badStars = renderStarsHtml(this.badStars, 'bad-star', useFullNames, false);
  var template = Handlebars.compile(templateSource);
  var palaceHtml = template(context);

  return palaceHtml;
};