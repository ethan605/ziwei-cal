Number.prototype.isEven = function() {
  return this % 2 === 0;
};

Number.prototype.quotient = function(divisor) {
   return (this - (this % divisor)) / divisor;
};

Number.prototype.limitInc = function(incStep = 1, limit = 12, minResult = 1) {
  var tempResult = this + incStep - minResult;
  var paddingMult = 0;

  if (tempResult < minResult)
    paddingMult = (limit - tempResult).quotient(limit);

  return (tempResult + paddingMult*limit) % limit + minResult;
}

Number.prototype.reflectIndex = function(reflectThrough) {
  return reflectThrough.limitInc(- this + reflectThrough);
};

String.prototype.getDisplayName = function(moduleName = undefined, prefix = "") {
  if (moduleName !== undefined)
    return Ziwei.Configs[moduleName][`${prefix}Names`][this];

  var allNamesArr = [
    'ThaiTueConstellation',
    'LocTonConstellation',
    'SixDeadlyStars',
    'SixLuckyStars',
    'OtherImportantStars'
  ].map(function(moduleName) {
    return Ziwei.Configs[`${moduleName}`][`${prefix}Names`];
  });

  var allNames = Object.assign.apply(this, allNamesArr);

  return allNames[this];
};

String.prototype.getFullName = function(moduleName = undefined) {
  return this.getDisplayName(moduleName);
};

String.prototype.getShortName = function(moduleName = undefined) {
  return this.getDisplayName(moduleName, "Short");
};

String.prototype.getElementColorStyle = function() {
  var color = Ziwei.Configs.Wuxing.ElementColors[this];
  return color === undefined ? "" : `color: ${color};`;
};

String.prototype.getPlaceQualityColorStyle = function() {
  var regexPattern = /(?!\()(\w|Đ)(?=\))/gi;
  var quality = (this.match(regexPattern) || [])[0];
  var color = Ziwei.Configs.Wuxing.PlaceQualityColors[quality];
  return color === undefined ? "" : `color: ${color};`;
};

Array.prototype.convertCoordinateToAbsPos = function() {
  var xCoord = this[0];
  var yCoord = this[1];

  return {
    left: (8 + 284*xCoord - 142 - 25),
    top: (8 + 164*yCoord - 10)
  };
};

function _Ziwei_Utils() {
};