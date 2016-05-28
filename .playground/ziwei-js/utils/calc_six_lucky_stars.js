_Ziwei_Calculator.prototype.calcTaHuuPositions = function(birthMonth) {
  var thinIndex = Ziwei.Configs.Branches.Indexes['thin'] - 2;
  var birthMonthIndex = Ziwei.Configs.Branches.Indexes[birthMonth];

  var taPhuIndex = thinIndex.limitInc(birthMonthIndex-1);
  var huuBatIndex = taPhuIndex.reflectIndex();

  return [
    Ziwei.Configs.Branches.Orders[taPhuIndex],
    Ziwei.Configs.Branches.Orders[huuBatIndex]
  ];
};

_Ziwei_Calculator.prototype.calcXuongKhucPositions = function(birthHour) {
  var thinIndex = Ziwei.Configs.Branches.Indexes['thin'];
  var birthHourIndex = Ziwei.Configs.Branches.Indexes[birthHour];

  var vanKhucIndex = thinIndex.limitInc(birthHourIndex-1);
  var vanXuongIndex = vanKhucIndex.reflectIndex();

  return [
    Ziwei.Configs.Branches.Orders[vanXuongIndex],
    Ziwei.Configs.Branches.Orders[vanKhucIndex]
  ];
};

_Ziwei_Calculator.prototype.calcSixLuckyStars = function(birthMonth, birthHour) {
  var [taPhuPosition, huuBatPosition] = this.calcTaHuuPositions(birthMonth);
  var [vanXuongPosition, vanKhucPosition] = this.calcXuongKhucPositions(birthHour);

  var starsPositions = {};

  [
    [taPhuPosition, 'ta_phu'],
    [huuBatPosition, 'huu_bat'],
    [vanXuongPosition, 'van_xuong'],
    [vanKhucPosition, 'van_khuc']
  ].forEach((pair) => {
    var [position, star] = pair;

    if (starsPositions[position] === undefined)
      starsPositions[position] = [];

    starsPositions[position].push(star);
  });

  return starsPositions;
};