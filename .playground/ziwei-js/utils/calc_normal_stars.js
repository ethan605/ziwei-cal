// Thiên Hình - Thiên Diêu
_Ziwei_Calculator.prototype.calcHinhDieuYPositions = function(birthMonth) {
  var birthMonthNumber = Ziwei.Configs.Branches.Indexes[birthMonth] - 2;
  
  var dauIndex = Ziwei.Configs.Branches.Indexes['dau'];
  var thienHinhIndex = dauIndex.limitInc(birthMonthNumber-1);

  var suuIndex = Ziwei.Configs.Branches.Indexes['suu'];
  var thienDieuIndex = suuIndex.limitInc(birthMonthNumber-1);
  var thienYIndex = thienDieuIndex;

  return [
    Ziwei.Configs.Branches.Orders[thienHinhIndex],
    Ziwei.Configs.Branches.Orders[thienDieuIndex],
    Ziwei.Configs.Branches.Orders[thienYIndex]
  ];
};

_Ziwei_Calculator.prototype.calcHoaCaiPosition = function(birthYearBranch) {
  var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[birthYearBranch];
  var hoaCaiPosition = Ziwei.Configs.BranchSets.Trilogy.ByElements[trilogyElement][1];

  return hoaCaiPosition;
};

_Ziwei_Calculator.prototype.calcAmSatPosition = function(birthMonth) {
  // By month:              6, 12   1, 7  2, 8   3, 9    4, 10  5, 11
  var possiblePositions = ['thin', 'dan', 'ty', 'tuat', 'than', 'ngo'];
  var birthMonthNumber = Ziwei.Configs.Branches.Indexes[birthMonth] - 2;
  var amSatPosition = possiblePositions[birthMonthNumber % 6];

  return amSatPosition;
};

_Ziwei_Calculator.prototype.calcCoQuaPositions = function(birthYearBranch) {
  var birthYearIndex = Ziwei.Configs.Branches.Indexes[birthYearBranch];
  var branchSetOrder = (birthYearIndex.limitInc() - 1).quotient(3);
  var branchSet = Ziwei.Configs.BranchSets.Trilogy.ByRelatives[branchSetOrder];
  var branchSetIndexes = branchSet.map((branch) => Ziwei.Configs.Branches.Indexes[branch]);

  var coThanIndex = branchSetIndexes[0].limitInc(-1);
  var quaTuIndex = branchSetIndexes[2].limitInc();

  return [
    Ziwei.Configs.Branches.Orders[coThanIndex],
    Ziwei.Configs.Branches.Orders[quaTuIndex]
  ];
};