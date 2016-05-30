_Ziwei_Models_ResultPalace.prototype.renderHtml = function(palaceSource, useFullNames = true) {
  var buildMainStarName = function(star, position, useFullNames = true) {
    var starName = useFullNames ? star.getFullName('ForteenMainStars') : star.getShortName('ForteenMainStars');
    return starName + ` (${Ziwei.Configs.ForteenMainStars.Places[star][position]})`;
  };

  var renderStarsHtml = function(position, stars, customClass, useFullNames = true, isMainStars = true) {
    var source = '<span class="' + `${customClass}` + '">{{ star }}</span>';
    var template = Handlebars.compile(source);
    var html = stars.map((star) => {
      var starName = useFullNames ? star.getFullName() : star.getShortName();
      
      if (isMainStars)
        starName = buildMainStarName(star, position, useFullNames);

      var colorStyle = starName.getPlaceQualityColorStyle();
      var starHtml = $(template({star: starName}));
      starHtml.attr('style', colorStyle);
      var resultHtml = $('<div></div>').append(starHtml).html();

      return resultHtml;
    }).join("");

    return html;
  };

  var context = useFullNames ? this.getFullNames() : this.getShortNames();
  context.mainStars = renderStarsHtml(this.position, this.mainStars, 'main-star', useFullNames);
  context.goodStars = renderStarsHtml(this.position, this.goodStars, 'good-star', useFullNames, false);
  context.badStars = renderStarsHtml(this.position, this.badStars, 'bad-star', useFullNames, false);
  var template = Handlebars.compile(palaceSource);
  var contentHtml = $(template(context));

  if (context.name === 'Mệnh')
    contentHtml.addClass('self');

  if (context.body === 'Thân')
    contentHtml.addClass('body');

  // Workaround: $.html() is not wrapped by top most HTML tags
  var palaceHtml = $("<div></div>").append(contentHtml).html();

  return palaceHtml;
};

_Ziwei_Models_ResultTable.prototype.renderHtml = function(tableSource, palaceSource) {
  var template = Handlebars.compile(tableSource);
  var renderedPalaces = {};

  this.palaces.forEach((position, palace) => {
    renderedPalaces[position] = palace.renderHtml(palaceSource);
  });

  var context = {
    renderedPalaces: renderedPalaces,
    centerInfo: "This is a center info!"
  }

  var tableHtml = template(context);

  return tableHtml;
};