_Ziwei_Calculator.prototype.calcKhongKiepPositions = function(birthHour) {
  var hoiIndex = Ziwei.Configs.Branches.Indexes['hoi'];
  var birthHourIndex = Ziwei.Configs.Branches.Indexes[birthHour];

  var diaKhongIndex = hoiIndex.limitInc(-birthHourIndex+1);
  var diaKiepIndex = hoiIndex.limitInc(birthHourIndex-1);

  return [
    Ziwei.Configs.Branches.Orders[diaKhongIndex],
    Ziwei.Configs.Branches.Orders[diaKiepIndex]
  ]
};

_Ziwei_Calculator.prototype.calcKinhDaPositions = function(locTonPosition) {
  var locTonIndex = Ziwei.Configs.Branches.Indexes[locTonPosition];

  var kinhDuongIndex = locTonIndex.limitInc();
  var daLaIndex = locTonIndex.limitInc(-1);

  return [
    Ziwei.Configs.Branches.Orders[kinhDuongIndex],
    Ziwei.Configs.Branches.Orders[daLaIndex]
  ]
};

_Ziwei_Calculator.prototype.calcHoaLinhPositions = function(birthYearBranch, birthHour) {
  var startPositions = {
    'hoa': ['suu', 'mao'],
    'thuy': ['dau', 'tuat'],
    'moc': ['dan', 'tuat'],
    'kim': ['mao', 'tuat']
  };

  var birthHourIndex = Ziwei.Configs.Branches.Indexes[birthHour];

  var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[birthYearBranch];
  var [hoaTinhStartPos, linhTinhStartPos] = startPositions[trilogyElement];
  var hoaTinhStartIndex = Ziwei.Configs.Branches.Indexes[hoaTinhStartPos];
  var linhTinhStartIndex = Ziwei.Configs.Branches.Indexes[linhTinhStartPos];

  var hoaTinhIndex = hoaTinhStartIndex.limitInc(birthHourIndex-1);
  var linhTinhIndex = linhTinhStartIndex.limitInc(-birthHourIndex+1);

  return [
    Ziwei.Configs.Branches.Orders[hoaTinhIndex],
    Ziwei.Configs.Branches.Orders[linhTinhIndex]
  ];
};

_Ziwei_Calculator.prototype.calcSixDeadlyStars = function(birthHour, locTonPosition, birthYearBranch) {
  var [diaKhongPosition, diaKiepPosition] = this.calcKhongKiepPositions(birthHour);
  var [kinhDuongPosition, daLaPosition] = this.calcKinhDaPositions(locTonPosition);
  var [hoaTinhPosition, linhTinhPosition] = this.calcHoaLinhPositions(birthYearBranch, birthHour);

  var starsPositions = {};

  [
    [diaKhongPosition, 'dia_khong'],
    [diaKiepPosition, 'dia_kiep'],
    [kinhDuongPosition, 'kinh_duong'],
    [daLaPosition, 'da_la'],
    [hoaTinhPosition, 'hoa_tinh'],
    [linhTinhPosition, 'linh_tinh']
  ].forEach((pair) => {
    var [position, star] = pair;

    if (starsPositions[position] === undefined)
      starsPositions[position] = [];

    starsPositions[position].push(star);
  });

  return starsPositions;
};