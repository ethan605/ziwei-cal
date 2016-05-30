_Ziwei_Calculator.prototype.calcLocTonPosition = function(birthYearStem) {
  var possiblePositions = {
    'giap': 'dan',
    'at': 'mao',
    'binh': 'ty2',
    'dinh': 'ngo',
    'mau': 'ty2',
    'ky': 'ngo',
    'canh': 'than',
    'tan': 'dau',
    'nham': 'ty',
    'quy': 'hoi'
  };

  return possiblePositions[birthYearStem];
};

_Ziwei_Calculator.prototype.calcThienMaPosition = function(birthYearBranch) {
  var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[birthYearBranch];
  var firstBranch = Ziwei.Configs.BranchSets.Trilogy.ByElements[trilogyElement][0];
  var firstBranchIndex = Ziwei.Configs.Branches.Indexes[firstBranch];
  var reflectBranchIndex = firstBranchIndex.limitInc(6);

  return Ziwei.Configs.Branches.Orders[reflectBranchIndex];
};

_Ziwei_Calculator.prototype.calcOtherImportantStars = function(birthYearStem, birthYearBranch) {
  var locTonPosition = this.calcLocTonPosition(birthYearStem);
  var thienMaPosition = this.calcThienMaPosition(birthYearBranch);

  var importantStars = {};

  if (importantStars[locTonPosition] === undefined)
    importantStars[locTonPosition] = [];
  importantStars[locTonPosition].push('loc_ton');

  if (importantStars[thienMaPosition] === undefined)
    importantStars[thienMaPosition] = [];
  importantStars[thienMaPosition].push('thien_ma');

  return importantStars;
};