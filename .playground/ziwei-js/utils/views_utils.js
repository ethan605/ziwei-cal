_Ziwei_Models_ResultPalace.tableSize = function(useFullNames = true) {
  return {
    'width': useFullNames ? 260 : 130,
    'height': useFullNames ? 180 : 180
  };
};

_Ziwei_Models_ResultTable.tableSize = function(useFullNames = true) {
  return {
    'width': useFullNames ? 1138 : 578,
    'height': useFullNames ? 658 : 658
  };
};

_Ziwei_Calculator.checkMobileDevice = function() {
  return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i).test(navigator.userAgent);
};