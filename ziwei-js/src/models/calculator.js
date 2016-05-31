_Ziwei_Calculator = function() {
  this.profiles = prepareProfilesData();

  function prepareProfilesData() {
    var raw_data = [
      ['anhctv', 'Chu Thị Vân Anh', 'Nữ', 'Mão', '14', 'Dần', 'Bính', 'Dần'],
      ['chind', 'Nguyễn Diệp Chi', 'Nữ', 'Mão', '23', 'Tỵ', 'Giáp', 'Ngọ'],
      ['dangnh', 'Nguyễn Hải Đăng', 'Nam', 'Thân', '1', 'Hợi', 'Tân', 'Mùi'],
      ['ducnm', 'Nguyễn Minh Đức', 'Nam', 'Mão', '15', 'Hợi', 'Mậu', 'Tý'],
      ['gianghh', 'Hà Hương Giang', 'Nữ', 'Dần', '7', 'Thìn', 'Tân', 'Mùi'],
      ['hoactq', 'Chu Thị Quỳnh Hoa', 'Nữ', 'Dần', '28', 'Thân', 'Tân', 'Mùi'],
      ['huonghh', 'Hàn Huyền Hương', 'Nữ', 'Tỵ', '20', 'Dần', 'Tân', 'Mùi'],
      ['huyennth', 'Nguyễn Thị Thu Huyền', 'Nữ', 'Tỵ', '5', 'Thìn', 'Giáp', 'Tý'],
      ['khoin', 'Nguyễn Khôi', 'Nam', 'Mùi', '2', 'Thìn', 'Tân', 'Mùi'],
      ['nam_1', 'Nam 1', 'Nam', 'Mão', '16', 'Ngọ', 'Quý', 'Dậu'],
      ['nam_2', 'Nam 2', 'Nam', 'Dần', '29', 'Tý', 'Kỷ', 'Mùi'],
      ['ngocpb', 'Phùng Bá Ngọc', 'Nam', 'Tý', '22', 'Sửu', 'Nhâm', 'Thân'],
      ['nu_1', 'Nữ 1', 'Nữ', 'Hợi', '10', 'Hợi', 'Giáp', 'Thìn'],
      ['nu_2', 'Nữ 2', 'Nữ', 'Mão', '3', 'Tuất', 'Canh', 'Ngọ'],
      ['nu_3', 'Nữ 3', 'Nữ', 'Dần', '24', 'Mùi', 'Đinh', 'Mão'],
      ['nu_4', 'Nữ 4', 'Nữ', 'Sửu', '29', 'Dần', 'Đinh', 'Sửu'],
      ['nu_5', 'Nữ 5', 'Nữ', 'Mùi', '14', 'Dậu', 'Quý', 'Dậu'],
      ['nu_6', 'Nữ 6', 'Nữ', 'Mão', '26', 'Ngọ', 'Tân', 'Hợi'],
      ['oanhntm', 'Nguyễn Thị Mai Oanh', 'Nữ', 'Tỵ', '14', 'Sửu', 'Giáp', 'Dần'],
      ['thanhnx', 'Nguyễn Xuân Thành', 'Nam', 'Tỵ', '22', 'Thìn', 'Tân', 'Mùi'],
      ['trungnt', 'Trung NT', 'Nam', 'Tý', '10', 'Ngọ', 'Nhâm', 'Tý'],
      ['trungnt2', 'Nguyễn Thành Trung', 'Nam', 'Hợi', '19', 'Dậu', 'Nhâm', 'Tuất'],
      ['trungpt', 'Phùng Thành Trung', 'Nam', 'Tý', '21', 'Mùi', 'Quý', 'Dậu'],
      ['tuanpm', 'Tuấn PM', 'Nam', 'Thân', '28', 'Thân', 'Ất', 'Mão'],
      ['yenbth', 'Bùi Thị Hải Yến', 'Nữ', 'Tuất', '12', 'Ngọ', 'Đinh', 'Mão']
    ];

    var profiles = {};

    raw_data.forEach((arr) => {
      var profile_data = {
        key: arr[0],
        name: arr[1],
        gender: Ziwei.Configs.Genders.Converts[arr[2]],
        hour: Ziwei.Configs.Branches.Converts[arr[3]],
        day: parseInt(arr[4]),
        month: Ziwei.Configs.Branches.Converts[arr[5]],
        year: {
          stem: Ziwei.Configs.Stems.Converts[arr[6]],
          branch: Ziwei.Configs.Branches.Converts[arr[7]]
        }
      };

      profiles[arr[0]] = new Ziwei.Models.Profile(profile_data);
    });

    return profiles;
  }
};

_Ziwei_Calculator.prototype.calcResultTable = function() {
  var _profile = this.currentProfile;
  var [selfPosition, bodyPosition] = this.calcSelfBodyPosition(_profile.birthHour, _profile.birthMonth);
  var palaces = this.calcPalacesPositions(selfPosition);
  var [cucElement, cucNumber] = this.calcCuc(selfPosition, _profile.birthYear.stem);
  _profile.updateCuc(cucElement, cucNumber);

  var forteenMainStars = this.calcForteenMainStars(cucElement, cucNumber, _profile.birthDay);
  var otherImportantStars = this.calcOtherImportantStars(_profile.birthYear.stem, _profile.birthYear.branch);
  var locTonPosition = otherImportantStars.findKey((position, stars) => stars.includes('loc_ton'));

  var opportunityAges = this.calcOpportunityAges(selfPosition, cucNumber, _profile.fateDirection);

  var thaiTueConstellation = this.calcThaiTueConstellation(_profile.birthYear.branch);
  var trangSinhConstellation = this.calcTrangSinhConstellation(cucNumber, _profile.fateDirection);
  var locTonConstellation = this.calcLocTonConstellation(locTonPosition, _profile.fateDirection);

  var sixDeadlyStars = this.calcSixDeadlyStars(_profile.birthHour, locTonPosition, _profile.birthYear.branch);
  var sixLuckyStars = this.calcSixLuckyStars(_profile.birthMonth, _profile.birthHour);

  var normalStars = this.calcNormalStars(_profile.birthMonth, _profile.birthYear.branch);
  var fourTransformationStars = this.calcFourTransformationStars(_profile.birthYear.stem, forteenMainStars, sixLuckyStars);

  var branches = Ziwei.Configs.Branches.Names.allKeys();
  var table = {};

  branches.forEach((branch) => {
    table[branch] = {
      'name': palaces[branch],
      'isBody': (branch === bodyPosition),
      'mainStars': forteenMainStars[branch] || [],
      'trangSinhConstellation': trangSinhConstellation[branch],
      'goodStars': [],
      'badStars': [],
      'opportunityAge': opportunityAges[branch]
    }

    // Classify by qualities
    var stars = otherImportantStars[branch];
    this.insertMultipleStarsToPalace(table[branch], stars, 'OtherImportantStars');

    stars = sixDeadlyStars[branch];
    this.insertMultipleStarsToPalace(table[branch], stars, 'SixDeadlyStars');

    stars = sixLuckyStars[branch];
    this.insertMultipleStarsToPalace(table[branch], stars, 'SixLuckyStars');

    var star = thaiTueConstellation[branch];
    this.insertSingleStarToPalace(table[branch], star, 'ThaiTueConstellation');

    star = locTonConstellation[branch];
    this.insertSingleStarToPalace(table[branch], star, 'LocTonConstellation');

    stars = normalStars[branch];
    this.insertMultipleStarsToPalace(table[branch], stars, 'NormalStars');

    stars = fourTransformationStars[branch];
    this.insertMultipleStarsToPalace(table[branch], stars, 'FourTransformationStars');
  });

  var resultTable = new Ziwei.Models.ResultTable({
    'profile': _profile,
    'palaces': table,
    'tuanCoordinate': this.calcTuanCoordinate(),
    'trietCoordinate': this.calcTrietCoordinate(),
    'connectedCoordinates': this.calcConnectedPalaceCoordinates(selfPosition)
  });

  return resultTable;
};

_Ziwei_Calculator.prototype.calculateProfile = function(profileKey = 'thanhnx') {
  this.currentProfile = this.profiles[profileKey];

  if (this.currentProfile === undefined) {
    throw "Invalid profile key";
    return;
  }

  return this.calcResultTable();
};