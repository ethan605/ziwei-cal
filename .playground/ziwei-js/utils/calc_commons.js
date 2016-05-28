_Ziwei_Calculator.prototype.calcSelfBodyPosition = function(birthHour, birthMonth) {
  var hourIndex = Ziwei.Configs.Branches.Indexes[birthHour];
  var monthIndex = Ziwei.Configs.Branches.Indexes[birthMonth];

  var selfIndex = monthIndex.limitInc(-hourIndex+1);
  var bodyIndex = monthIndex.limitInc(hourIndex-1);

  return [
    Ziwei.Configs.Branches.Orders[selfIndex],
    Ziwei.Configs.Branches.Orders[bodyIndex]
  ];
};

_Ziwei_Calculator.prototype.calcCuc = function(selfPosition, birthYearStem) {
  var startElement = Ziwei.Configs.Wuxing.ElementsByBranches[selfPosition];
  var startElementIndex = Ziwei.Configs.Wuxing.Elements.indexOf(startElement);
  
  var countingSteps = Ziwei.Configs.Stems.Indexes[birthYearStem];
  var cucIndex = startElementIndex.limitInc(countingSteps, 5, 0);

  var cucElement = Ziwei.Configs.Wuxing.Elements[cucIndex];
  var cucNumber = Ziwei.Configs.Wuxing.CucByElements[cucElement];

  return [cucElement, cucNumber];
};

_Ziwei_Calculator.prototype.calcPalacesPositions = function(selfPosition) {
  var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
  var branches = Object.keys(Ziwei.Configs.Branches.Names);
  var palaces = Ziwei.Configs.Palaces.Orders;

  return this.mergeSequencesFromIndex(branches, palaces, selfIndex);
};

_Ziwei_Calculator.prototype.calcOpportunityAges = function(selfPosition, cucNumber, fateDirection) {
  var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
  var branches = Object.keys(Ziwei.Configs.Branches.Names);
  var ages = Array.fromRange(0, 11).map(function(mult) {
    return cucNumber + 10*mult;
  });

  return this.mergeSequencesFromIndex(branches, ages, selfIndex, fateDirection === -1);
};

_Ziwei_Calculator.prototype.mergeSequencesFromIndex =
function(firstSequence, secondSequence, mergeIndex, reversedOrder = false) {
  var secondSeq = secondSequence.slice();

  // re-arrange second sequence in order of first one,
  // skip if mergeIndex is 1 (2 sequences have identical order)
  if (mergeIndex != 1) {
    var [firstHalf, secondHalf] = [[], []];

    if (!reversedOrder) {
      firstHalf = secondSeq.slice(12-mergeIndex+1, secondSeq.length);
      secondHalf = secondSeq.slice(0, 12-mergeIndex+1);
    } else {
      firstHalf = secondSeq.slice(0, mergeIndex).reverse();
      secondHalf = secondSeq.slice(mergeIndex, secondSeq.length).reverse();
    }

    secondSeq = firstHalf.concat(secondHalf);
  }

  return [firstSequence, secondSeq].transpose().toHash();
};

_Ziwei_Calculator.prototype.calcConnectedPalaceCoordinates = function(selfPosition) {
  var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
  var selfCoordinate = Ziwei.Configs.Palaces.DrawingRootCoordinates[selfPosition];

  var oppositeIndex = selfIndex.limitInc(6);
  var oppositePosition = Ziwei.Configs.Branches.Orders[oppositeIndex];
  var oppositeCoordinate = Ziwei.Configs.Palaces.DrawingRootCoordinates[oppositePosition];

  var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[selfPosition];
  var sameSetPositions = Ziwei.Configs.BranchSets.Trilogy.ByElements[trilogyElement].slice();
  var selfPositionIndex = selfPosition.indexOf(selfPosition);
  sameSetPositions = sameSetPositions.filter((x, i) => i !== selfPositionIndex);

  var sameSetCoordinates = sameSetPositions.map((position) =>
    Ziwei.Configs.Palaces.DrawingRootCoordinates[position]
  );

  var coordinates = [oppositeCoordinate];
  coordinates.push(...sameSetCoordinates);

  return coordinates.map((fromCoordinate) => [fromCoordinate, selfCoordinate]);
};