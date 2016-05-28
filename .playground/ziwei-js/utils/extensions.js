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

Array.prototype.convertCoordinateToAbsPos = function() {
  var xCoord = this[0];
  var yCoord = this[1];

  return {
    left: (8 + 284*xCoord - 142 - 25),
    top: (8 + 164*yCoord - 10)
  };
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

  result = Array
    .apply(null, Array(_to - _from + 1))
    .map((_, index) => _from + index);

  if (reversed)
    result = result.reverse();

  return result;
};

Object.values = Object.values || ((obj) => Object.keys(obj).map(key => obj[key]));