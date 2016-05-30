_Ziwei_Models_ResultPalace.prototype.renderHtml = function(palaceSource, useFullNames = true) {
  var buildMainStarName = function(star, position, useFullNames = true) {
    var starName = useFullNames ? star.getFullName('ForteenMainStars') : star.getShortName('ForteenMainStars');
    return starName + ` (${Ziwei.Configs.ForteenMainStars.Places[star][position]})`;
  };

  var renderStarsHtml = function(position, stars, customClass, useFullNames = true, isMainStars = true) {
    var source = '<span class="{{ class }}" style="{{ style }}">{{ star }}</span>';
    var template = Handlebars.compile(source);
    var html = stars.map((star) => {
      var starName = useFullNames ? star.getFullName() : star.getShortName();
      
      if (isMainStars)
        starName = buildMainStarName(star, position, useFullNames);

      var colorStyle = starName.getPlaceQualityColorStyle();
      var starHtml = template({star: starName, class: customClass, style: colorStyle});

      return starHtml;
    }).join("\n");

    return html;
  };

  var context = useFullNames ? this.getFullNames() : this.getShortNames();
  context.mainStars = renderStarsHtml(this.position, this.mainStars, 'main-star', useFullNames);
  context.goodStars = renderStarsHtml(this.position, this.goodStars, 'good-star', useFullNames, false);
  context.badStars = renderStarsHtml(this.position, this.badStars, 'bad-star', useFullNames, false);
  context.selfClass = context.name === 'Mệnh' ? 'self' : '';
  context.bodyClass = context.body === 'Thân' ? 'body' : '';

  var template = Handlebars.compile(palaceSource);
  var contentHtml = $(template(context));

  // Workaround: $.html() is not wrapped by top most HTML tags
  var palaceHtml = $("<div></div>").append(contentHtml).html();

  return palaceHtml;
};

_Ziwei_Models_ResultTable.prototype.renderHtml = function(tableSource, palaceSource, centerInfoSource) {
  var template = Handlebars.compile(tableSource);
  var renderedPalaces = {};

  this.palaces.forEach((position, palace) => {
    renderedPalaces[position] = palace.renderHtml(palaceSource);
  });

  var context = {
    renderedPalaces: renderedPalaces,
    centerInfo: this.profile.renderHtml(centerInfoSource)
  }

  var tableHtml = template(context);
  return tableHtml;
};

_Ziwei_Models_Profile.prototype.renderHtml = function(centerInfoSource) {
  var template = Handlebars.compile(centerInfoSource);

  var ageGanZhi = this.birthYear.toString();
  var ageSymbol = Ziwei.Configs.Wuxing.AgeSymbols[ageGanZhi];
  var ageElement = Ziwei.Configs.Wuxing.AgeElements[ageGanZhi];

  var context = {
    name: this.name,
    birthHour: this.birthHour.getFullName('Branches'),
    birthDay: this.birthDay,
    birthMonth: this.birthMonth.getFullName('Branches'),
    birthYear: this.birthYear,
    ageSymbol: ageSymbol,
    ageSymbolColorStyle: ageElement.getElementColorStyle(),
    yinyangGender: this.yinyangGender,
    cucFullName: this.cucElement.getFullName("Wuxing"),
    cucNumber: this.cucNumber,
    cucElementColorStyle: this.cucElement.getElementColorStyle()
  };

  var centerInfoHtml = template(context);
  return centerInfoHtml;
};

_Ziwei_Calculator.renderHtml = function() {
  calculator = new Ziwei.Calculator();
  resultTable = calculator.calculateProfile();

  palaceSource = $("#palace-template").html();
  tableSource = $("#result-template").html();
  centerInfoSource = $("#center-info-template").html();

  tableHtml = resultTable.renderHtml(tableSource, palaceSource, centerInfoSource);
  $("body").append(tableHtml);
}