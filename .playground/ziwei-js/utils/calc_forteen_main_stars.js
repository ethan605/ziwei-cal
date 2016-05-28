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
  var countingStartPosition = kmtlnTable[kmtlnIndex];
  
  if (birthDay < cucNumber)
    return countingStartPosition;

  // mod > 0 & birthDay > cucNumber
  var countingStartIndex = Ziwei.Configs.Branches.Indexes[countingStartPosition];
  tuViIndex = countingStartIndex.limitInc(quotient);

  return Ziwei.Configs.Branches.Orders[tuViIndex];
};

// Cơ (Thiên Cơ); Liêm (Liêm Trinh) & Vũ (Vũ Khúc)
_Ziwei_Calculator.prototype.calcCoLiemVuPositions = function(tuViPosition) {
  var tuViIndex = Ziwei.Configs.Branches.Indexes[tuViPosition];
  
  return [
    Ziwei.Configs.Branches.Orders[tuViIndex.limitInc(-1)],
    Ziwei.Configs.Branches.Orders[tuViIndex.limitInc(4)],
    Ziwei.Configs.Branches.Orders[tuViIndex.limitInc(-4)]
  ];
};

// Nhật (Thái Dương) & Đồng (Thiên Đồng)
_Ziwei_Calculator.prototype.calcNhatDongPositions = function(vuKhucPosition) {
  var vuKhucIndex = Ziwei.Configs.Branches.Indexes[vuKhucPosition];
  
  return [
    Ziwei.Configs.Branches.Orders[vuKhucIndex.limitInc(1)],
    Ziwei.Configs.Branches.Orders[vuKhucIndex.limitInc(-1)]
  ];
};

// Phá (Phá Quân)
_Ziwei_Calculator.prototype.calcPhaQuanPosition = function(tuViPosition) {
  var tuViIndex = Ziwei.Configs.Branches.Indexes[tuViPosition];
  return Ziwei.Configs.Branches.Orders[tuViIndex.reflectIndex()];
};

// Phủ - Nguyệt - Tham - Cự - Tướng - Lương - Sát
_Ziwei_Calculator.prototype.calcThienPhuConstellationPositions = function(phaQuanPosition) {
  var phaQuanIndex = Ziwei.Configs.Branches.Indexes[phaQuanPosition];

  // Thiên Phủ
  var thienPhuIndex = phaQuanIndex.limitInc(2);
  var constelationPositions = [Ziwei.Configs.Branches.Orders[thienPhuIndex]];

  // Nguyệt - Tham - Cự - Tướng - Lương - Sát
  Array.fromRange(1, 6).forEach(() => {
    thienPhuIndex = thienPhuIndex.limitInc();
    constelationPositions.push(Ziwei.Configs.Branches.Orders[thienPhuIndex]);
  });

  return constelationPositions;
};

_Ziwei_Calculator.prototype.calcForteenMainStars = function(cucElement, cucNumber, birthDay) {
  var stars = ['tu_vi', 'thien_co', 'liem_trinh', 'vu_khuc', 'thai_duong', 'thien_dong', 'pha_quan', 'thien_phu', 'thai_am', 'tham_lang', 'cu_mon', 'thien_tuong', 'thien_luong', 'that_sat'];

  var starsPositions = [];

  var tuVi = this.calcTuViPosition(cucElement, cucNumber, birthDay);
  starsPositions.push(tuVi);
  starsPositions.push(...this.calcCoLiemVuPositions(tuVi));
  starsPositions.push(...this.calcNhatDongPositions(starsPositions[3]));
  
  var phaQuan = this.calcPhaQuanPosition(tuVi);
  starsPositions.push(phaQuan);
  starsPositions.push(...this.calcThienPhuConstellationPositions(phaQuan));

  var mainStarsPositions = {};

  stars.forEach((star, index) => {
    var key = starsPositions[index];

    if (mainStarsPositions[key] === undefined)
      mainStarsPositions[key] = [];

    mainStarsPositions[key].push(star);
  });

  return mainStarsPositions;
};