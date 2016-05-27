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

function _Ziwei_Utils() {
};