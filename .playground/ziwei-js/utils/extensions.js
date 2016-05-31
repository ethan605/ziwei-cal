Number.prototype.isEven = function() {
  return this % 2 === 0;
};

Number.prototype.quotient = function(divisor) {
  return (this - (this % divisor)) / divisor;
};

Number.prototype.limitInc = function(incStep = 1, limit = 12, minResult = 1) {
  var tempResult = this + incStep - 1;
  var paddingMult = 0;

  if (tempResult < minResult)
    paddingMult = (limit - tempResult).quotient(limit);

  return (tempResult + paddingMult*limit) % limit + minResult;
}

Number.prototype.reflectIndex = function(reflectThrough = 2) {
  return reflectThrough.limitInc(-this+reflectThrough);
};

String.prototype.getDisplayName = function(moduleName = undefined, prefix = "") {
  if (moduleName !== undefined)
    return Ziwei.Configs[moduleName][`${prefix}Names`][this];

  var allNamesArr = [
    'ThaiTueConstellation',
    'LocTonConstellation',
    'SixDeadlyStars',
    'SixLuckyStars',
    'OtherImportantStars',
    'NormalStars',
    'FourTransformationStars'
  ].map((moduleName) => Ziwei.Configs[`${moduleName}`][`${prefix}Names`]);

  var allNames = Object.assign.apply(this, allNamesArr);
  return allNames[this];
};

String.prototype.getFullName = function(moduleName = undefined) {
  return this.getDisplayName(moduleName);
};

String.prototype.getShortName = function(moduleName = undefined) {
  return this.getDisplayName(moduleName, 'Short');
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

Array.prototype.convertPalaceCoordinateToPos = function(padding = {top: 8, left: 8}, useFullNames = true) {
  var [xCoord, yCoord] = this;

  var tableSize = Ziwei.Models.ResultPalace.tableSize(useFullNames);

  return {
    left: padding.left + (tableSize.width+4)*(xCoord - 0.5) - 25,
    top: padding.top + (tableSize.height+4)*yCoord - 10
  };
};

Array.prototype.convertLineOriginCoordinateToPos = function(useFullNames = true) {
  var [xCoord, yCoord] = this;

  var tableSize = Ziwei.Models.ResultPalace.tableSize(useFullNames);
  
  return {
    left: (tableSize.width+4)*xCoord,
    top: (tableSize.height+4)*yCoord
  };
};

Array.prototype.drawLineTo = function(toCoord, canvasId, color = 'black', useFullNames = true) {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");

  context.beginPath();
  
  var fromPos = this.convertLineOriginCoordinateToPos(useFullNames);
  var toPos = toCoord.convertLineOriginCoordinateToPos(useFullNames);

  context.moveTo(fromPos.left, fromPos.top);
  context.lineTo(toPos.left, toPos.top);
  context.lineWidth = 1;

  context.strokeStyle = color;
  context.stroke();
};

Array.prototype.transpose = function() {
  var _self = this;
  return _self[0].map((_, index) => _self.map((row) => row[index]));
};

Array.prototype.toHash = function() {
  return this.reduce((previous, current) => {
    previous[current[0]] = current[1];
    return previous;
  }, {});
};

Array.prototype.toHashOfArrays = function() {
  return this.reduce((previous, current) => {
    var [key, value] = current;
    previous[key] = previous[key] || [];
    previous[key].push(value);

    return previous;
  }, {});
};

Array.fromRange = function(from, to) {
  if (from === to)
    return [from];

  var _from = from, _to = to, reversed = false;

  if (from > to) {
    _from = to;
    _to = from;
    reversed = true;
  }

  var result = Array.apply(null, Array(_to - _from + 1)).map((_, index) => _from + index);

  if (reversed)
    result = result.reverse();

  return result;
};

Object.prototype.allKeys = function() {
  return Object.keys(this);
};

Object.prototype.allValues = function() {
  var _self = this;
  return Object.keys(_self).map((key) => _self[key]);
};

Object.prototype.count = function() {
  return Object.keys(this).length;
};

Object.prototype.forEach = function(callback) {
  var _self = this;
  Object.keys(_self).forEach((key) => callback(key, _self[key]));
};

Object.prototype.mapKeyValues = function(callback) {
  var _self = this;
  return Object.keys(_self).map((key) => callback(key, _self[key]));
};

Object.prototype.findKeyValues = function(callback) {
  var _self = this;
  var results = {};
  Object.keys(_self).find((key) => {
    if (callback(key, _self[key]) === true && results.count() === 0)
      results[key] = _self[key];
  });

  return results;
};

Object.prototype.findKey = function(callback) {
  var _self = this;
  return Object.keys(_self).find((key) => callback(key, _self[key]));
};

Object.prototype.filter = function(callback) {
  var _self = this;
  var results = {};
  Object.keys(_self).filter((key) => {
    if (callback(key, _self[key]) === true)
      results[key] = _self[key];
  });

  return results;
};

Object.prototype.filterKeys = function(callback) {
  var _self = this;
  return Object.keys(_self).filter((key) => callback(key, _self[key]));
};