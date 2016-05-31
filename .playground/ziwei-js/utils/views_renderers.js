_Ziwei_Models_ResultPalace.tableSize = function(useFullNames = true) {
  return {
    'width': useFullNames ? 260 : 140,
    'height': useFullNames ? 170 : 170
  };
};

_Ziwei_Models_ResultTable.tableSize = function(useFullNames = true) {
  var palaceSize = Ziwei.Models.ResultPalace.tableSize(useFullNames);

  return {
    'width': 4+palaceSize.width*4,
    'height': 4+palaceSize.height*4
  };
};

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
  context.size = Ziwei.Models.ResultPalace.tableSize(useFullNames);
  context.mainStars = renderStarsHtml(this.position, this.mainStars, 'main-star', useFullNames);
  context.goodStars = renderStarsHtml(this.position, this.goodStars, 'good-star', useFullNames, false);
  context.badStars = renderStarsHtml(this.position, this.badStars, 'bad-star', useFullNames, false);
  context.selfClass = context.name === 'Mệnh' ? 'self' : '';
  context.bodyClass = context.body === 'Thân' ? 'body' : '';

  var template = Handlebars.compile(palaceSource);
  var palaceHtml = template(context);

  return palaceHtml;
};

_Ziwei_Models_ResultTable.prototype.renderHtml = function(tableSource, palaceSource, centerInfoSource, useFullNames = true) {
  var template = Handlebars.compile(tableSource);
  var renderedPalaces = {};

  this.palaces.forEach((position, palace) => {
    renderedPalaces[position] = palace.renderHtml(palaceSource, useFullNames);
  });

  var context = {
    'canvas': Ziwei.Models.ResultTable.tableSize(useFullNames),
    'tuanPos': {top: -100, left: -100},
    'trietPos': {top: -100, left: -100},
    'renderedPalaces': renderedPalaces,
    'centerInfo': this.profile.renderHtml(centerInfoSource)
  }

  var tableHtml = template(context);
  return tableHtml;
};

_Ziwei_Models_ResultTable.prototype.drawConnectedLines = function(canvasId, useFullNames = true) {
  this.connectedCoordinates.forEach((coordinatePair, index) => {
    var [fromCoord, toCoord] = coordinatePair;
    var color = index === 0 ? "red" : "blue"; // Red line for opposite connection
    fromCoord.drawLineTo(toCoord, canvasId, color, useFullNames);
  });
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

_Ziwei_Calculator.renderHtml = function(resultTable, useFullNames = true) {
  var palaceSource = $('#palace-template').html();
  var tableSource = $('#result-template').html();
  var centerInfoSource = $('#center-info-template').html();

  // Insert table HTML
  var tableHtml = resultTable.renderHtml(tableSource, palaceSource, centerInfoSource, useFullNames);
  $('div#result-display').replaceWith(tableHtml);

  // Change HTML page attributes
  document.title = resultTable.profile.name + " - Ziwei Calculator in JS";
  var tableSize = Ziwei.Models.ResultTable.tableSize(useFullNames);
  $('body').width(tableSize.width);

  // Re-position Tuan & Triet
  var padding = $('#result-display').position();
  ['tuan', 'triet'].forEach((star) => {
    var starAbsPos = resultTable[star + 'Coordinate'].convertPalaceCoordinateToPos(padding, useFullNames);
    $(`#${star}-khong`).css(starAbsPos);
  });

  // Draw connected lines
  resultTable.drawConnectedLines('connected-lines', useFullNames);
}