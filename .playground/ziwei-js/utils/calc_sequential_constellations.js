_Ziwei_Calculator.prototype.calcThaiTueConstellationPositions = function(birthYearBranch) {
  var thaiTueIndex = Ziwei.Configs.Branches.Indexes[birthYearBranch];
  var branches = Object.keys(Ziwei.Configs.Branches.Names);
  var stars = Ziwei.Configs.ThaiTueConstellation.Orders;

  return this.mergeSequencesFromIndex(branches, stars, thaiTueIndex);
};

_Ziwei_Calculator.prototype.calcTrangSinhConstellationPositions = function(cucNumber, fateDirection) {
  var possiblePositions = ['than', 'hoi', 'ty2', 'than', 'dan'];
  var trangSinhPosition = possiblePositions[cucNumber-2];
  var trangSinhIndex = Ziwei.Configs.Branches.Indexes[trangSinhPosition];

  var branches = Object.keys(Ziwei.Configs.Branches.Names);
  var stars = Ziwei.Configs.TrangSinhConstellation.Orders.slice();

  return this.mergeSequencesFromIndex(branches, stars, trangSinhIndex, fateDirection == -1);
};

_Ziwei_Calculator.prototype.calcLocTonConstellationPositions = function(locTonPosition, fateDirection) {
  var locTonIndex = Ziwei.Configs.Branches.Indexes[locTonPosition];
  var branches = Object.keys(Ziwei.Configs.Branches.Names);
  var stars = Ziwei.Configs.LocTonConstellation.Orders;

  return this.mergeSequencesFromIndex(branches, stars, locTonIndex, fateDirection == -1);
};