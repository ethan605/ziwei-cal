_Ziwei_Calculator.prototype.calcTuViPosition = function(cucElement, cucNumber, birthDay) {
  var mod = birthDay % cucNumber;
  var quotient = birthDay.quotient(cucNumber);
  var tuViIndex = 1;

  if (mod === 0) {
    var danIndex = Ziwei.Configs.Branches.Indexes['dan'];
    tuViIndex = danIndex.limitInc(quotient-1);

    return Ziwei.Configs.Branches.Orders[tuViIndex];
  }

  // mod > 0
  var kmtlnTable = Object.values(Ziwei.Configs.Wuxing.KmtlnTable);
  var kmtlnStart = kmtlnTable.indexOf(Ziwei.Configs.Wuxing.KmtlnTable[cucElement]);
  var kmtlnIndex = kmtlnStart + mod - 1;
  countingStartPosition = kmtlnTable[kmtlnIndex];
  
  if (birthDay < cucNumber)
    return countingStartPosition;

  // mod > 0 & birthDay > cucNumber
  var countingStartIndex = Ziwei.Configs.Branches.Indexes[countingStartPosition];
  tuViIndex = countingStartIndex.limitInc(quotient);

  return Ziwei.Configs.Branches.Orders[tuViIndex];
};