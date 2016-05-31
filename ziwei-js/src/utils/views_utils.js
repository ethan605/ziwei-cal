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

_Ziwei_Calculator.checkMobileDevice = function() {
  return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i).test(navigator.userAgent);
};