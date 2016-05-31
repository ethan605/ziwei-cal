
  var Ziwei = (function () {
  Number.prototype.isEven = function() {
  return this % 2 === 0;
};

Number.prototype.quotient = function(divisor) {
  return (this - (this % divisor)) / divisor;
};

Number.prototype.limitInc = function(incStep = 1, limit = 12, minResult = 1) {
  var tempResult = this + incStep - 1;
  var paddingMult = 0;

  if (tempResult < minResult)
    paddingMult = (limit - tempResult).quotient(limit);

  return (tempResult + paddingMult*limit) % limit + minResult;
}

Number.prototype.reflectIndex = function(reflectThrough = 2) {
  return reflectThrough.limitInc(-this+reflectThrough);
};

String.prototype.getDisplayName = function(moduleName = undefined, prefix = "") {
  if (moduleName !== undefined)
    return Ziwei.Configs[moduleName][`${prefix}Names`][this];

  var allNamesArr = [
    'ThaiTueConstellation',
    'LocTonConstellation',
    'SixDeadlyStars',
    'SixLuckyStars',
    'OtherImportantStars',
    'NormalStars',
    'FourTransformationStars'
  ].map((moduleName) => Ziwei.Configs[`${moduleName}`][`${prefix}Names`]);

  var allNames = Object.assign.apply(this, allNamesArr);
  return allNames[this];
};

String.prototype.getFullName = function(moduleName = undefined) {
  return this.getDisplayName(moduleName);
};

String.prototype.getShortName = function(moduleName = undefined) {
  return this.getDisplayName(moduleName, 'Short');
};

String.prototype.getElementColorStyle = function() {
  var color = Ziwei.Configs.Wuxing.ElementColors[this];
  return color === undefined ? "" : `color: ${color};`;
};

String.prototype.getPlaceQualityColorStyle = function() {
  var regexPattern = /(?!\()(\w|Đ)(?=\))/gi;
  var quality = (this.match(regexPattern) || [])[0];
  var color = Ziwei.Configs.Wuxing.PlaceQualityColors[quality];

  return color === undefined ? "" : `color: ${color};`;
};

Array.prototype.convertPalaceCoordinateToPos = function() {
  var [xCoord, yCoord] = this;

  return {
    left: (8 + 284*xCoord - 142 - 25),
    top: (8 + 164*yCoord - 10)
  };
};

Array.prototype.convertLineOriginCoordinateToPos = function() {
  var [xCoord, yCoord] = this;
  
  return {
    left: 284*xCoord,
    top: 164*yCoord
  };
};

Array.prototype.drawLineTo = function(toCoord, canvasId, color = 'black') {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");

  context.beginPath();
  
  var fromPos = this.convertLineOriginCoordinateToPos();
  var toPos = toCoord.convertLineOriginCoordinateToPos();

  context.moveTo(fromPos.left, fromPos.top);
  context.lineTo(toPos.left, toPos.top);
  context.lineWidth = 1;

  context.strokeStyle = color;
  context.stroke();
};

Array.prototype.transpose = function() {
  var _self = this;
  return _self[0].map((_, index) => _self.map((row) => row[index]));
};

Array.prototype.toHash = function() {
  return this.reduce((previous, current) => {
    previous[current[0]] = current[1];
    return previous;
  }, {});
};

Array.prototype.toHashOfArrays = function() {
  return this.reduce((previous, current) => {
    var [key, value] = current;
    previous[key] = previous[key] || [];
    previous[key].push(value);

    return previous;
  }, {});
};

Array.fromRange = function(from, to) {
  if (from === to)
    return [from];

  var _from = from, _to = to, reversed = false;

  if (from > to) {
    _from = to;
    _to = from;
    reversed = true;
  }

  var result = Array.apply(null, Array(_to - _from + 1)).map((_, index) => _from + index);

  if (reversed)
    result = result.reverse();

  return result;
};

Object.prototype.allKeys = function() {
  return Object.keys(this);
};

Object.prototype.allValues = function() {
  var _self = this;
  return Object.keys(_self).map((key) => _self[key]);
};

Object.prototype.count = function() {
  return Object.keys(this).length;
};

Object.prototype.forEach = function(callback) {
  var _self = this;
  Object.keys(_self).forEach((key) => callback(key, _self[key]));
};

Object.prototype.mapKeyValues = function(callback) {
  var _self = this;
  return Object.keys(_self).map((key) => callback(key, _self[key]));
};

Object.prototype.findKeyValues = function(callback) {
  var _self = this;
  var results = {};
  Object.keys(_self).find((key) => {
    if (callback(key, _self[key]) === true && results.count() === 0)
      results[key] = _self[key];
  });

  return results;
};

Object.prototype.findKey = function(callback) {
  var _self = this;
  return Object.keys(_self).find((key) => callback(key, _self[key]));
};

Object.prototype.filter = function(callback) {
  var _self = this;
  var results = {};
  Object.keys(_self).filter((key) => {
    if (callback(key, _self[key]) === true)
      results[key] = _self[key];
  });

  return results;
};

Object.prototype.filterKeys = function(callback) {
  var _self = this;
  return Object.keys(_self).filter((key) => callback(key, _self[key]));
};
  var _Ziwei_Configs_BranchSets = {
  Trilogy: {
    ByElements: {
      'hoa': ['dan', 'ngo', 'tuat'],
      'thuy': ['than', 'ty', 'thin'],
      'kim': ['ty2', 'dau', 'suu'],
      'moc': ['hoi', 'mao', 'mui']
    },

    ByBranches: {
      'ty': 'thuy',
      'suu': 'kim',
      'dan': 'hoa',
      'mao': 'moc',
      'thin': 'thuy',
      'ty2': 'kim',
      'ngo': 'hoa',
      'mui': 'moc',
      'than': 'thuy',
      'dau': 'kim',
      'tuat': 'hoa',
      'hoi': 'moc'
    },

    ByRelatives: [
      ['hoi', 'ty', 'suu'],
      ['dan', 'mao', 'thin'],
      ['ty2', 'ngo', 'mui'],
      ['than', 'dau', 'tuat']
    ]
  },

  Duadrilogy: {
  }
};
var _Ziwei_Configs_Branches = {
  Names: {
    'ty': 'Tý',
    'suu': 'Sửu',
    'dan': 'Dần',
    'mao': 'Mão',
    'thin': 'Thìn',
    'ty2': 'Tỵ',
    'ngo': 'Ngọ',
    'mui': 'Mùi',
    'than': 'Thân',
    'dau': 'Dậu',
    'tuat': 'Tuất',
    'hoi': 'Hợi'
  },

  Converts: {
    'Tý': 'ty',
    'Sửu': 'suu',
    'Dần': 'dan',
    'Mão': 'mao',
    'Thìn': 'thin',
    'Tỵ': 'ty2',
    'Ngọ': 'ngo',
    'Mùi': 'mui',
    'Thân': 'than',
    'Dậu': 'dau',
    'Tuất': 'tuat',
    'Hợi': 'hoi'
  },

  Indexes: {
    'ty': 1,
    'suu': 2,
    'dan': 3,
    'mao': 4,
    'thin': 5,
    'ty2': 6,
    'ngo': 7,
    'mui': 8,
    'than': 9,
    'dau': 10,
    'tuat': 11,
    'hoi': 12
  },

  Orders: ['_', 'ty', 'suu', 'dan', 'mao', 'thin', 'ty2', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
};
var _Ziwei_Configs_ForteenMainStars = {
  Names: {
    'tu_vi': 'Tử Vi',
    'thien_co': 'Thiên Cơ',
    'liem_trinh': 'Liêm Trinh',
    'thai_duong': 'Thái Dương',
    'vu_khuc': 'Vũ Khúc',
    'thien_dong': 'Thiên Đồng',
    'thien_phu': 'Thiên Phủ',
    'thai_am': 'Thái Âm',
    'tham_lang': 'Tham Lang',
    'cu_mon': 'Cự Môn',
    'thien_tuong': 'Thiên Tướng',
    'thien_luong': 'Thiên Lương',
    'that_sat': 'Thất Sát',
    'pha_quan': 'Phá Quân'
  },

  ShortNames: {
    'tu_vi': 'Tử',
    'thien_co': 'Cơ',
    'liem_trinh': 'Liêm',
    'thai_duong': 'Nhật',
    'vu_khuc': 'Vũ',
    'thien_dong': 'Đồng',
    'thien_phu': 'Phủ',
    'thai_am': 'Nguyệt',
    'tham_lang': 'Tham',
    'cu_mon': 'Cự',
    'thien_tuong': 'Tướng',
    'thien_luong': 'Lương',
    'that_sat': 'Sát',
    'pha_quan': 'Phá'
  },

  Places: {
    'tu_vi': {'ty':"B", 'suu':"Đ", 'dan':"M", 'mao':"B", 'thin':"V", 'ty2':"M", 'ngo':"M", 'mui':"Đ", 'than':"M", 'dau':"B", 'tuat':"V", 'hoi':"B"},
    'thien_co': {'ty':"Đ", 'suu':"Đ", 'dan':"H", 'mao':"M", 'thin':"M", 'ty2':"V", 'ngo':"Đ", 'mui':"Đ", 'than':"V", 'dau':"M", 'tuat':"M", 'hoi':"H"},
    'thai_duong': {'ty':"H", 'suu':"Đ", 'dan':"V", 'mao':"V", 'thin':"V", 'ty2':"M", 'ngo':"M", 'mui':"Đ", 'than':"H", 'dau':"H", 'tuat':"H", 'hoi':"H"},
    'vu_khuc': {'ty':"V", 'suu':"M", 'dan':"V", 'mao':"Đ", 'thin':"M", 'ty2':"H", 'ngo':"V", 'mui':"M", 'than':"V", 'dau':"Đ", 'tuat':"M", 'hoi':"H"},
    'thien_dong': {'ty':"V", 'suu':"H", 'dan':"M", 'mao':"Đ", 'thin':"H", 'ty2':"Đ", 'ngo':"H", 'mui':"H", 'than':"M", 'dau':"H", 'tuat':"H", 'hoi':"Đ"},
    'liem_trinh': {'ty':"V", 'suu':"Đ", 'dan':"V", 'mao':"H", 'thin':"M", 'ty2':"H", 'ngo':"V", 'mui':"Đ", 'than':"V", 'dau':"H", 'tuat':"M", 'hoi':"H"},
    'thien_phu': {'ty':"M", 'suu':"B", 'dan':"M", 'mao':"B", 'thin':"V", 'ty2':"Đ", 'ngo':"M", 'mui':"Đ", 'than':"M", 'dau':"B", 'tuat':"V", 'hoi':"Đ"},
    'thai_am': {'ty':"V", 'suu':"Đ", 'dan':"H", 'mao':"H", 'thin':"H", 'ty2':"H", 'ngo':"H", 'mui':"Đ", 'than':"V", 'dau':"M", 'tuat':"M", 'hoi':"M"},
    'tham_lang': {'ty':"H", 'suu':"M", 'dan':"Đ", 'mao':"H", 'thin':"V", 'ty2':"H", 'ngo':"H", 'mui':"M", 'than':"Đ", 'dau':"H", 'tuat':"V", 'hoi':"H"},
    'cu_mon': {'ty':"V", 'suu':"H", 'dan':"V", 'mao':"M", 'thin':"H", 'ty2':"H", 'ngo':"V", 'mui':"H", 'than':"Đ", 'dau':"M", 'tuat':"H", 'hoi':"Đ"},
    'thien_tuong': {'ty':"V", 'suu':"Đ", 'dan':"M", 'mao':"H", 'thin':"V", 'ty2':"Đ", 'ngo':"V", 'mui':"Đ", 'than':"M", 'dau':"H", 'tuat':"V", 'hoi':"Đ"},
    'thien_luong': {'ty':"V", 'suu':"Đ", 'dan':"V", 'mao':"V", 'thin':"M", 'ty2':"H", 'ngo':"M", 'mui':"Đ", 'than':"V", 'dau':"H", 'tuat':"M", 'hoi':"H"},
    'that_sat': {'ty':"M", 'suu':"Đ", 'dan':"M", 'mao':"H", 'thin':"H", 'ty2':"V", 'ngo':"M", 'mui':"Đ", 'than':"M", 'dau':"H", 'tuat':"H", 'hoi':"V"},
    'pha_quan': {'ty':"M", 'suu':"V", 'dan':"H", 'mao':"H", 'thin':"Đ", 'ty2':"H", 'ngo':"M", 'mui':"V", 'than':"H", 'dau':"H", 'tuat':"Đ", 'hoi':"H"}
  }
};
var _Ziwei_Configs_FourTransformationStars = {
  Names: {
    'hoa_loc': 'Hóa Lộc',
    'hoa_quyen': 'Hóa Quyền',
    'hoa_khoa': 'Hóa Khoa',
    'hoa_ky': 'Hóa Kỵ'
  },

  ShortNames: {
    'hoa_loc': 'Lộc',
    'hoa_quyen': 'Quyền',
    'hoa_khoa': 'Khoa',
    'hoa_ky': 'Kỵ'
  },

  Qualities: {
    'hoa_loc': 'good',
    'hoa_quyen': 'good',
    'hoa_khoa': 'good',
    'hoa_ky': 'bad'
  }
};
var _Ziwei_Configs_Genders = {
  Names: {
    'male': 'Nam',
    'female': 'Nữ'
  },

  Converts: {
    'Nam': 'male',
    'Nữ': 'female'
  },

  Directions: {
    'male': 1,
    'female': -1
  }
};
var _Ziwei_Configs_LocTonConstellation = {
  Names: {
    'bac_si': 'Bác Sĩ',
    'luc_si': 'Lực Sĩ',
    'thanh_long': 'Thanh Long',
    'tieu_hao': 'Tiểu Hao',
    'tuong_quan': 'Tướng Quân',
    'tau_thu': 'Tấu Thư',
    'phi_liem': 'Phi Liêm',
    'hy_than': 'Hỷ Thần',
    'benh_phu': 'Bệnh Phù',
    'dai_hao': 'Đại Hao',
    'phuc_binh': 'Phục Binh',
    'quan_phu2': 'Quan Phủ'
  },

  ShortNames: {
    'bac_si': 'B.Sĩ',
    'luc_si': 'L.Sĩ',
    'thanh_long': 'T.Long',
    'tieu_hao': 'T.Hao',
    'tuong_quan': 'T.Quân',
    'tau_thu': 'T.Thư',
    'phi_liem': 'P.Liêm',
    'hy_than': 'H.Thần',
    'benh_phu': 'B.Phù',
    'dai_hao': 'Đ.Hao',
    'phuc_binh': 'P.Binh',
    'quan_phu2': 'Q.Phủ'
  },

  Orders: ['bac_si', 'luc_si', 'thanh_long', 'tieu_hao', 'tuong_quan', 'tau_thu', 'phi_liem', 'hy_than', 'benh_phu', 'dai_hao', 'phuc_binh', 'quan_phu2'],

  Qualities: {
    'bac_si': 'good',
    'luc_si': 'good',
    'thanh_long': 'good',
    'tieu_hao': 'bad',
    'tuong_quan': 'good',
    'tau_thu': 'good',
    'phi_liem': 'good',
    'hy_than': 'good',
    'benh_phu': 'bad',
    'dai_hao': 'bad',
    'phuc_binh': 'bad',
    'quan_phu2': 'bad'
  }
};
var _Ziwei_Configs_NormalStars = {
  Names: {
    'thien_hinh': 'Thiên Hình',
    'thien_dieu': 'Thiên Diêu',
    'thien_y': 'Thiên Y',
    'thien_khoc': 'Thiên Khốc',
    'thien_hu': 'Thiên Hư',
    'hoa_cai': 'Hoa Cái',
    'am_sat': 'Âm Sát',
    'co_than': 'Cô Thần',
    'qua_tu': 'Quả Tú'
  },

  ShortNames: {
    'thien_hinh': 'Hình',
    'thien_dieu': 'Diêu',
    'thien_y': 'Y',
    'thien_khoc': 'Khốc',
    'thien_hu': 'Hư',
    'hoa_cai': 'Cái',
    'am_sat': 'Âm Sát',
    'co_than': 'Cô',
    'qua_tu': 'Quả'
  },

  Qualities: {
    'thien_hinh': 'bad',
    'thien_dieu': 'bad',
    'thien_y': 'good',
    'thien_khoc': 'bad',
    'thien_hu': 'bad',
    'hoa_cai': 'bad',
    'am_sat': 'bad',
    'co_than': 'bad',
    'qua_tu': 'bad'
  }
};
var _Ziwei_Configs_OtherImportantStars = {
  Names: {
    'loc_ton': 'Lộc Tồn',
    'thien_ma': 'Thiên Mã'
  },

  ShortNames: {
    'loc_ton': 'Lộc',
    'thien_ma': 'Mã'
  },

  Qualities: {
    'loc_ton': 'good',
    'thien_ma': 'good'
  }
};
var _Ziwei_Configs_Palaces = {
  Names: {
    'self': 'Mệnh',
    'parents': 'Phụ Mẫu',
    'mental': 'Phúc Đức',
    'property': 'Điền Trạch',
    'career': 'Quan Lộc',
    'friends': 'Nô Bộc',
    'travel': 'Thiên Di',
    'health': 'Tật Ách',
    'wealth': 'Tài Bạch',
    'children': 'Tử Tức',
    'spouse': 'Phu Thê',
    'siblings': 'Huynh Đệ'
  },

  ShortNames: {
    'self': 'Mệnh',
    'parents': 'Phụ',
    'mental': 'Phúc',
    'property': 'Điền',
    'career': 'Quan',
    'friends': 'Nô',
    'travel': 'Di',
    'health': 'Tật',
    'wealth': 'Tài',
    'children': 'Tử',
    'spouse': 'Phối',
    'siblings': 'Bào'
  },

  Orders: ['self', 'parents', 'mental', 'property', 'career', 'friends', 'travel', 'health', 'wealth', 'children', 'spouse', 'siblings'],

  DrawingRootCoordinates: {
    'ty': [2.5, 3],
    'suu': [1.5, 3],
    'dan': [1, 3],
    'mao': [1, 2.5],
    'thin': [1, 1.5],
    'ty2': [1, 1],
    'ngo': [1.5, 1],
    'mui': [2.5, 1],
    'than': [3, 1],
    'dau': [3, 1.5],
    'tuat': [3, 2.5],
    'hoi': [3, 3]
  }
};
var _Ziwei_Configs_SixDeadlyStars = {
  Names: {
    'dia_khong': 'Địa Không',
    'dia_kiep': 'Địa Kiếp',
    'kinh_duong': 'Kình Dương',
    'da_la': 'Đà La',
    'hoa_tinh': 'Hỏa Tinh',
    'linh_tinh': 'Linh Tinh'
  },

  ShortNames: {
    'dia_khong': 'Không',
    'dia_kiep': 'Kiếp',
    'kinh_duong': 'Kình',
    'da_la': 'Đà',
    'hoa_tinh': 'Hỏa',
    'linh_tinh': 'Linh'
  },

  Qualities: {
    'dia_khong': 'bad',
    'dia_kiep': 'bad',
    'kinh_duong': 'bad',
    'da_la': 'bad',
    'hoa_tinh': 'bad',
    'linh_tinh': 'bad'
  }
};
var _Ziwei_Configs_SixLuckyStars = {
  Names: {
    'ta_phu': 'Tả Phù',
    'huu_bat': 'Hữu Bật',
    'van_xuong': 'Văn Xương',
    'van_khuc': 'Văn Khúc',
    'thien_khoi': 'Thiên Khôi',
    'thien_viet': 'Thiên Việt'
  },

  ShortNames: {
    'ta_phu': 'Tả',
    'huu_bat': 'Hữu',
    'van_xuong': 'Xương',
    'van_khuc': 'Khúc',
    'thien_khoi': 'Khôi',
    'thien_viet': 'Việt'
  },

  Qualities: {
    'ta_phu': 'good',
    'huu_bat': 'good',
    'van_xuong': 'good',
    'van_khuc': 'good',
    'thien_khoi': 'good',
    'thien_viet': 'good'
  }
};
var _Ziwei_Configs_Stems = {
  Names: {
    'giap': 'Giáp',
    'at': 'Ất',
    'binh': 'Bính',
    'dinh': 'Đinh',
    'mau': 'Mậu',
    'ky': 'Kỷ',
    'canh': 'Canh',
    'tan': 'Tân',
    'nham': 'Nhâm',
    'quy': 'Quý'
  },

  Converts: {
    'Giáp': 'giap',
    'Ất': 'at',
    'Bính': 'binh',
    'Đinh': 'dinh',
    'Mậu': 'mau',
    'Kỷ': 'ky',
    'Canh': 'canh',
    'Tân': 'tan',
    'Nhâm': 'nham',
    'Quý': 'quy'
  },

  Indexes: {
    'giap': 1,
    'at': 2,
    'binh': 3,
    'dinh': 4,
    'mau': 5,
    'ky': 6,
    'canh': 7,
    'tan': 8,
    'nham': 9,
    'quy': 10
  },

  Orders: ['_', 'giap', 'at', 'binh', 'dinh', 'mau', 'ky', 'canh', 'tan', 'nham', 'quy'],

  Directions: {
    'giap': 1,
    'at': -1,
    'binh': 1,
    'dinh': -1,
    'mau': 1,
    'ky': -1,
    'canh': 1,
    'tan': -1,
    'nham': 1,
    'quy': -1
  },

  Yinyang: {
    '-1': 'Âm',
    '1': 'Dương'
  }
};
var _Ziwei_Configs_ThaiTueConstellation = {
  Names: {
    'thai_tue': 'Thái Tuế',
    'thieu_duong': 'Thiếu Dương',
    'tang_mon': 'Tang Môn',
    'thieu_am': 'Thiếu Âm',
    'quan_phu': 'Quan Phù',
    'tu_phu': 'Tử Phù',
    'tue_pha': 'Tuế Phá',
    'long_duc': 'Long Đức',
    'bach_ho': 'Bạch Hổ',
    'phuc_duc': 'Phúc Đức',
    'dieu_khach': 'Điếu Khách',
    'truc_phu': 'Trực Phù'
  },

  ShortNames: {
    'thai_tue': 'T.Tuế',
    'thieu_duong': 'T.Dương',
    'tang_mon': 'T.Môn',
    'thieu_am': 'T.Âm',
    'quan_phu': 'Q.Phù',
    'tu_phu': 'T.Phù',
    'tue_pha': 'T.Phá',
    'long_duc': 'L.Đức',
    'bach_ho': 'B.Hổ',
    'phuc_duc': 'P.Đức',
    'dieu_khach': 'Đ.Khách',
    'truc_phu': 'Tr.Phù'
  },

  Orders: ['thai_tue', 'thieu_duong', 'tang_mon', 'thieu_am', 'quan_phu', 'tu_phu', 'tue_pha', 'long_duc', 'bach_ho', 'phuc_duc', 'dieu_khach', 'truc_phu'],

  Qualities: {
    'thai_tue': 'bad',
    'thieu_duong': 'good',
    'tang_mon': 'bad',
    'thieu_am': 'good',
    'quan_phu': 'bad',
    'tu_phu': 'bad',
    'tue_pha': 'bad',
    'long_duc': 'good',
    'bach_ho': 'bad',
    'phuc_duc': 'good',
    'dieu_khach': 'bad',
    'truc_phu': 'bad'
  }
};
var _Ziwei_Configs_TrangSinhConstellation = {
  Names: {
    'trang_sinh': 'Tràng Sinh',
    'moc_duc': 'Mộc Dục',
    'quan_doi': 'Quan Đới',
    'lam_quan': 'Lâm Quan',
    'de_vuong': 'Đế Vượng',
    'suy': 'Suy',
    'benh': 'Bệnh',
    'tu': 'Tử',
    'mo': 'Mộ',
    'tuyet': 'Tuyệt',
    'thai': 'Thai',
    'duong': 'Dưỡng'
  },

  ShortNames: {
    'trang_sinh': 'Tr.Sinh',
    'moc_duc': 'M.Dục',
    'quan_doi': 'Q.Đới',
    'lam_quan': 'L.Quan',
    'de_vuong': 'Vượng',
    'suy': 'Suy',
    'benh': 'Bệnh',
    'tu': 'Tử',
    'mo': 'Mộ',
    'tuyet': 'Tuyệt',
    'thai': 'Thai',
    'duong': 'Dưỡng'
  },

  Orders: ['trang_sinh', 'moc_duc', 'quan_doi', 'lam_quan', 'de_vuong', 'suy', 'benh', 'tu', 'mo', 'tuyet', 'thai', 'duong']
};
var _Ziwei_Configs_TuanTriet = {
  Names: {
    'tuan': 'Tuần Không',
    'triet': 'Triệt Không'
  },

  ShortNames: {
    'tuan': 'Tuần',
    'triet': 'Triệt'
  }
};
var _Ziwei_Configs_Wuxing = {
  Names: {
    'hoa': 'Hỏa',
    'tho': 'Thổ',
    'moc': 'Mộc',
    'kim': 'Kim',
    'thuy': 'Thủy'
  },

  Converts: {
    'Hỏa': 'hoa',
    'Thổ': 'tho',
    'Mộc': 'moc',
    'Kim': 'kim',
    'Thủy': 'thuy'
  },

  Elements: ['hoa', 'tho', 'moc', 'kim', 'thuy'],

  CucByElements: {
    'thuy': 2,
    'moc': 3,
    'kim': 4,
    'tho': 5,
    'hoa': 6
  },

  ElementsByBranches: {
    'ty': 'thuy',
    'suu': 'thuy',
    'dan': 'hoa',
    'mao': 'hoa',
    'thin': 'moc',
    'ty2': 'moc',
    'ngo': 'tho',
    'mui': 'tho',
    'than': 'kim',
    'dau': 'kim',
    'tuat': 'hoa',
    'hoi': 'hoa'
  },

  KmtlnTable: {
    'hoa': 'dau',
    'tho': 'ngo',
    'kim': 'hoi',
    'moc': 'thin',
    'thuy': 'suu'
  },

  ElementColors: {
    'hoa': 'red',
    'tho': 'orange',
    'moc': 'darkgreen',
    'kim': 'darkgrey',
    'thuy': 'black'
  },

  PlaceQualityColors: {
    'M': 'red',
    'V': 'orange',
    'Đ': 'yellowgreen',
    'B': 'darkgreen',
    'H': 'darkgrey'
  },

  AgeSymbols: {
    'Giáp Tý': 'Hải Trung KIM',
    'Ất Sửu': 'Hải Trung KIM',
    'Bính Dần': 'Lô Trung HOẢ',
    'Đinh Mão': 'Lô Trung HOẢ',
    'Mậu Thìn': 'Đại Lâm MỘC',
    'Kỷ Ty': 'Đại Lâm MỘC',
    'Canh Ngọ': 'Lộ Bàng THỔ',
    'Tân Mùi': 'Lộ Bàng THỔ',
    'Nhâm Thân': 'Kiếm Phong KIM',
    'Quý Dậu': 'Kiếm Phong KIM',
    'Giáp Tuất': 'Sơn Đầu HOẢ',
    'Ất Hợi': 'Sơn Đầu HOẢ',
    'Bính Tý': 'Giang Hạ THUỶ',
    'Đinh Sửu': 'Giang Hạ THUỶ',
    'Mậu Dần': 'Thành Đầu THỔ',
    'Kỹ Mão': 'Thành Đầu THỔ',
    'Canh Thìn': 'Bạch Lạp KIM',
    'Tân Ty': 'Bạch Lạp KIM',
    'Nhâm Ngọ': 'Dương Liễu MỘC',
    'Quý Mùi': 'Dương Liễu MỘC',
    'Giáp Thân': 'Tuyền Trung THUỶ',
    'Ất Dậu': 'Tuyền Trung THUỶ',
    'Bính Tuất': 'Ốc Thượng THỔ',
    'Đinh Hợi': 'Ốc Thượng THỔ',
    'Mậu Tý': 'Tích Lịch HOẢ',
    'Kỷ Sửu': 'Tích Lịch HOẢ',
    'Canh Dần': 'Tùng Bách MỘC',
    'Tân Mão': 'Tùng Bách MỘC',
    'Nhâm Thìn': 'Trường Lưu THUỶ',
    'Quý Ty': 'Trường Lưu THUỶ',
    'Giáp Ngọ': 'Sa Trung KIM',
    'Ất Mùi': 'Sa Trung KIM',
    'Bính Thân': 'Sơn Hạ HOẢ',
    'Đinh Dậu': 'Sơn Hạ HOẢ',
    'Mậu Tuất': 'Bình Địa MỘC',
    'Kỷ Hợi': 'Bình Địa MỘC',
    'Canh Tý': 'Bích Thượng THỔ',
    'Tân Sửu': 'Bích Thượng THỔ',
    'Nhâm Dần': 'Kim Bạch KIM',
    'Quý Mão': 'Kim Bạch KIM',
    'Giáp Thìn': 'Phú Đăng HOẢ',
    'Ất Ty': 'Phú Đăng HOẢ',
    'Bính Ngọ': 'Thiên Hà THUỶ',
    'Đinh Mùi': 'Thiên Hà THUỶ',
    'Mậu Thân': 'Đại Trạch THỔ',
    'Kỷ Dậu': 'Đại Trạch THỔ',
    'Canh Tuất': 'Thoa Xuyến KIM',
    'Tân Hợi': 'Thoa Xuyến KIM',
    'Nhâm Tý': 'Tang Đốc MỘC',
    'Quý Sửu': 'Tang Đốc MỘC',
    'Giáp Dần': 'Đại Khê THUỶ',
    'Ất Mão': 'Đại Khê THUỶ',
    'Bính Thìn': 'Sa Trung THỔ',
    'Đinh Ty': 'Sa Trung THỔ',
    'Mậu Ngọ': 'Thiên Thượng HOẢ',
    'Kỷ Mùi': 'Thiên Thượng HOẢ',
    'Canh Thân': 'Thạch Lựu MỘC',
    'Tân Dậu': 'Thạch Lựu MỘC',
    'Nhâm Tuất': 'Đại Hải THUỶ',
    'Quý Hợi': 'Đại Hải THUỶ'
  },

  AgeElements: {
    'Giáp Tý': 'kim',
    'Ất Sửu': 'kim',
    'Bính Dần': 'hoa',
    'Đinh Mão': 'hoa',
    'Mậu Thìn': 'moc',
    'Kỷ Ty': 'moc',
    'Canh Ngọ': 'tho',
    'Tân Mùi': 'tho',
    'Nhâm Thân': 'kim',
    'Quý Dậu': 'kim',
    'Giáp Tuất': 'hoa',
    'Ất Hợi': 'hoa',
    'Bính Tý': 'thuy',
    'Đinh Sửu': 'thuy',
    'Mậu Dần': 'tho',
    'Kỹ Mão': 'tho',
    'Canh Thìn': 'kim',
    'Tân Ty': 'kim',
    'Nhâm Ngọ': 'moc',
    'Quý Mùi': 'moc',
    'Giáp Thân': 'thuy',
    'Ất Dậu': 'thuy',
    'Bính Tuất': 'tho',
    'Đinh Hợi': 'tho',
    'Mậu Tý': 'hoa',
    'Kỷ Sửu': 'hoa',
    'Canh Dần': 'moc',
    'Tân Mão': 'moc',
    'Nhâm Thìn': 'thuy',
    'Quý Ty': 'thuy',
    'Giáp Ngọ': 'kim',
    'Ất Mùi': 'kim',
    'Bính Thân': 'hoa',
    'Đinh Dậu': 'hoa',
    'Mậu Tuất': 'moc',
    'Kỷ Hợi': 'moc',
    'Canh Tý': 'tho',
    'Tân Sửu': 'tho',
    'Nhâm Dần': 'kim',
    'Quý Mão': 'kim',
    'Giáp Thìn': 'hoa',
    'Ất Ty': 'hoa',
    'Bính Ngọ': 'thuy',
    'Đinh Mùi': 'thuy',
    'Mậu Thân': 'tho',
    'Kỷ Dậu': 'tho',
    'Canh Tuất': 'kim',
    'Tân Hợi': 'kim',
    'Nhâm Tý': 'moc',
    'Quý Sửu': 'moc',
    'Giáp Dần': 'thuy',
    'Ất Mão': 'thuy',
    'Bính Thìn': 'tho',
    'Đinh Ty': 'tho',
    'Mậu Ngọ': 'hoa',
    'Kỷ Mùi': 'hoa',
    'Canh Thân': 'moc',
    'Tân Dậu': 'moc',
    'Nhâm Tuất': 'thuy',
    'Quý Hợi': 'thuy'
  }
};
var _Ziwei_Models_GanZhi = class {
  constructor(args = {}) {
    var _stem = args['stem'] || 'giap';
    var _branch = args['branch'] || 'ty';

    if (_stem === undefined || _branch === undefined) {
      throw "Undefined stem or branch";
      return;
    }

    this.stem = _stem;
    this.branch = _branch;

    var stemIndex = Ziwei.Configs.Stems.Orders.indexOf(this.stem);
    var branchIndex = Ziwei.Configs.Branches.Orders.indexOf(this.branch);

    if (stemIndex < 0 || branchIndex < 0)
      throw "Invalid stem or branch";

    if (stemIndex.isEven() ^ branchIndex.isEven() === true)
      throw "Invalid stem-branch pair";
  };

  toString() {
    return [
      Ziwei.Configs.Stems.Names[this.stem],
      Ziwei.Configs.Branches.Names[this.branch]
    ].join(" ");
  };
};
var _Ziwei_Models_Profile = class {
  constructor(args = {}) {
    this.key = args['key'] || "keyname";
    this.name = args['name'] || "Họ Và Tên";

    this.gender = args['gender'];
    if (Ziwei.Configs.Genders.Names[this.gender] === undefined)
      this.gender = 'male';

    this.birthHour = args['birthHour'] || args['hour'];
    if (Ziwei.Configs.Branches.Names[this.birthHour] === undefined)
      this.birthHour = 'ty';

    this.birthDay = args['birthDay'] || args['day'] || 1
    if (this.birthDay <= 0 || this.birthDay > 30)
      this.birthDay = 1;

    this.birthMonth = args['birthMonth'] || args['month'];
    if (Ziwei.Configs.Branches.Names[this.birthMonth] === undefined)
      this.birthMonth = 'ty';

    var birthYear = args['birthYear'] || args['year'];
    this.birthYear = new Ziwei.Models.GanZhi(birthYear);

    var stemDirection = Ziwei.Configs.Stems.Directions[this.birthYear.stem];

    this.yinyangGender = [
      Ziwei.Configs.Stems.Yinyang[stemDirection],
      Ziwei.Configs.Genders.Names[this.gender]
    ].join(" ");

    this.fateDirection = stemDirection * Ziwei.Configs.Genders.Directions[this.gender];
  }

  updateCuc(_cucElement, _cucNumber) {
    this.cucElement = _cucElement;
    this.cucNumber = _cucNumber;
  }

  detail() {
    var t = [
      this.yinyangGender,
      Ziwei.Configs.Branches.Names[this.birthHour],
      this.birthDay,
      Ziwei.Configs.Branches.Names[this.birthMonth],
      this.birthYear
    ];
    return `${t[0]}, sinh giờ ${t[1]} ngày ${t[2]} tháng ${t[3]} năm ${t[4]}`;
  }

  toString() {
    var t = [
      this.name,
      this.yinyangGender,
      Ziwei.Configs.Branches.Names[this.birthHour],
      this.birthDay,
      Ziwei.Configs.Branches.Names[this.birthMonth],
      this.birthYear.inspect
    ];
    return `<Ziwei.Models.Profile - Name: ${t[0]} - Gender: ${t[1]} - Birthday: ${t[2]} ${t[3]}/${t[4]}/${t[5]}>`;
  }
};
var _Ziwei_Models_ResultPalace = class {
  constructor(configs = {}) {
    this.position = configs.position;
    this.name = configs.name;
    this.isBody = configs.isBody;
    this.mainStars = configs.mainStars;
    this.goodStars = configs.goodStars;
    this.badStars = configs.badStars;
    this.trangSinhConstellation = configs.trangSinhConstellation;
    this.opportunityAge = configs.opportunityAge;
  };

  getFullNames() {
    var _self = this;

    return {
      position: _self.position.getFullName('Branches'),
      name: _self.name.getFullName('Palaces'),
      body: _self.isBody ? 'Thân' : '',
      mainStars: _self.mainStars.map(function(star) {
        var quality = Ziwei.Configs.ForteenMainStars.Places[star][_self.position];
        return star.getFullName('ForteenMainStars') + ` (${quality})`;
      }),
      goodStars: _self.goodStars.map((star) => star.getFullName()),
      badStars: _self.badStars.map((star) => star.getFullName()),
      trangSinhConstellation: _self.trangSinhConstellation.getFullName("TrangSinhConstellation"),
      opportunityAge: _self.opportunityAge
    };
  };

  getShortNames() {
    var _self = this;

    return {
      position: _self.position.getFullName('Branches'),
      name: _self.name.getShortName('Palaces'),
      body: _self.isBody ? 'Thân' : '',
      mainStars: _self.mainStars.map(function(star) {
        var quality = Ziwei.Configs.ForteenMainStars.Places[star][_self.position];
        return star.getShortName('ForteenMainStars') + ` (${quality})`;
      }),
      goodStars: _self.goodStars.map((star) => star.getShortName()),
      badStars: _self.badStars.map((star) => star.getShortName()),
      trangSinhConstellation: _self.trangSinhConstellation.getShortName("TrangSinhConstellation"),
      opportunityAge: _self.opportunityAge
    };
  };
};
var _Ziwei_Models_ResultTable = class {
  constructor(args = {}) {
    this.profile = args['profile'];
    
    var palaceConfigs = args['palaces'];
    
    var allPalaces = {};
    palaceConfigs.forEach((position, config) => {
      var palace = new Ziwei.Models.ResultPalace(Object.assign({'position': position}, config));
      allPalaces[position] = palace;
    });
    this.palaces = allPalaces;
    
    this.tuanCoordinate = args['tuanCoordinate'];
    this.trietCoordinate = args['trietCoordinate'];
    this.connectedCoordinates = args['connectedCoordinates'];
  };

  renderTemplateContext(useFullNames = true) {
    return {
      renderedPalaces: this.palaces.map((position, palace) => palace.renderTemplateContext(useFullNames)),
      centerInfo: 'Center Infomation!'
    };
  };
};
  var _Ziwei_Calculator = function() {
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
  var branches = Ziwei.Configs.Branches.Names.allKeys();
  var palaces = Ziwei.Configs.Palaces.Orders;

  return this.mergeSequencesFromIndex(branches, palaces, selfIndex);
};

_Ziwei_Calculator.prototype.calcOpportunityAges = function(selfPosition, cucNumber, fateDirection) {
  var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
  var branches = Ziwei.Configs.Branches.Names.allKeys();
  var ages = Array.fromRange(0, 11).map((mult) => cucNumber + 10*mult);
  
  return this.mergeSequencesFromIndex(branches, ages, selfIndex, fateDirection === -1);
};

_Ziwei_Calculator.prototype.calcConnectedPalaceCoordinates = function(selfPosition) {
  var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
  var selfCoordinate = Ziwei.Configs.Palaces.DrawingRootCoordinates[selfPosition];

  var oppositeIndex = selfIndex.limitInc(6);
  var oppositePosition = Ziwei.Configs.Branches.Orders[oppositeIndex];
  var oppositeCoordinate = Ziwei.Configs.Palaces.DrawingRootCoordinates[oppositePosition];

  var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[selfPosition];
  var sameSetPositions = Ziwei.Configs.BranchSets.Trilogy.ByElements[trilogyElement].slice();
  var selfPositionIndex = sameSetPositions.indexOf(selfPosition);
  sameSetPositions.splice(selfPositionIndex, 1); // Remove selfPosition element

  var sameSetCoordinates = sameSetPositions.map((position) =>
    Ziwei.Configs.Palaces.DrawingRootCoordinates[position]
  );

  var coordinates = [oppositeCoordinate];
  coordinates.push(...sameSetCoordinates);

  return coordinates.map((fromCoordinate) => [fromCoordinate, selfCoordinate]);
};
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
  var kmtlnTable = Ziwei.Configs.Wuxing.KmtlnTable.allValues();
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
_Ziwei_Calculator.prototype.calcFourTransformationStars = function(birthYearStem, forteenMainStars, sixLuckyStars) {
  var positionsByStems = {
    'giap': ['liem_trinh', 'thien_phu', 'vu_khuc', 'thai_duong'],
    'at': ['thien_co', 'thien_luong', 'tu_vi', 'thai_am'],
    'binh': ['thien_dong', 'thien_co', 'van_xuong', 'liem_trinh'],
    'dinh': ['thai_am', 'thien_dong', 'thien_co', 'cu_mon'],
    'mau': ['tham_lang', 'thai_am', 'huu_bat', 'thien_co'],
    'ky': ['vu_khuc', 'tham_lang', 'thien_luong', 'van_khuc'],
    'canh': ['thai_duong', 'vu_khuc', 'thai_am', 'thien_dong'],
    'tan': ['cu_mon', 'thai_duong', 'van_khuc', 'van_xuong'],
    'nham': ['thien_luong', 'tu_vi', 'thien_phu', 'vu_khuc'],
    'quy': ['pha_quan', 'cu_mon', 'thai_am', 'tham_lang']
  };

  var forTransformationPositions = positionsByStems[birthYearStem].map((transformationStar) => {
    var mainStarPosition = forteenMainStars.findKey(
      (position) => forteenMainStars[position].includes(transformationStar)
    );

    if (mainStarPosition !== undefined)
      return mainStarPosition;

    var otherStarPosition = sixLuckyStars.findKey(
      (position) => sixLuckyStars[position].includes(transformationStar)
    );

    return otherStarPosition;
  });

  var starsPositions = [
    forTransformationPositions,
    ['hoa_loc', 'hoa_quyen', 'hoa_khoa', 'hoa_ky']
  ].transpose().toHashOfArrays();

  return starsPositions;
};
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

_Ziwei_Calculator.prototype.calcKhocHuPositions = function(birthYearBranch) {
  var ngoIndex = Ziwei.Configs.Branches.Indexes['ngo'];
  var birthYearIndex = Ziwei.Configs.Branches.Indexes[birthYearBranch];

  var thienKhocIndex = ngoIndex.limitInc(-birthYearIndex+1);
  var thienHuIndex = ngoIndex.limitInc(birthYearIndex-1);

  return [
    Ziwei.Configs.Branches.Orders[thienKhocIndex],
    Ziwei.Configs.Branches.Orders[thienHuIndex]
  ];
};

_Ziwei_Calculator.prototype.calcNormalStars = function(birthMonth, birthYearBranch) {
  var [thienHinhPosition, thienDieuPosition, thienYPosition] = this.calcHinhDieuYPositions(birthMonth);
  var hoaCaiPosition = this.calcHoaCaiPosition(birthYearBranch);
  var amSatPosition = this.calcAmSatPosition(birthMonth);
  var [coThanPosition, quaTuPosition] = this.calcCoQuaPositions(birthYearBranch);
  var [thienKhocPosition, thienHuPosition] = this.calcKhocHuPositions(birthYearBranch);

  var starsPositions = [
    [thienHinhPosition, 'thien_hinh'],
    [thienDieuPosition, 'thien_dieu'],
    [thienYPosition, 'thien_y'],
    [hoaCaiPosition, 'hoa_cai'],
    [amSatPosition, 'am_sat'],
    [coThanPosition, 'co_than'],
    [quaTuPosition, 'qua_tu'],
    [thienKhocPosition, 'thien_khoc'],
    [thienHuPosition, 'thien_hu']
  ].toHashOfArrays();

  return starsPositions;
};
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
_Ziwei_Calculator.prototype.calcThaiTueConstellation = function(birthYearBranch) {
  var thaiTueIndex = Ziwei.Configs.Branches.Indexes[birthYearBranch];
  var branches = Ziwei.Configs.Branches.Names.allKeys();
  var stars = Ziwei.Configs.ThaiTueConstellation.Orders;

  return this.mergeSequencesFromIndex(branches, stars, thaiTueIndex);
};

_Ziwei_Calculator.prototype.calcTrangSinhConstellation = function(cucNumber, fateDirection) {
  var possiblePositions = ['than', 'hoi', 'ty2', 'than', 'dan'];
  var trangSinhPosition = possiblePositions[cucNumber-2];
  var trangSinhIndex = Ziwei.Configs.Branches.Indexes[trangSinhPosition];

  var branches = Ziwei.Configs.Branches.Names.allKeys();
  var stars = Ziwei.Configs.TrangSinhConstellation.Orders.slice();

  return this.mergeSequencesFromIndex(branches, stars, trangSinhIndex, fateDirection == -1);
};

_Ziwei_Calculator.prototype.calcLocTonConstellation = function(locTonPosition, fateDirection) {
  var locTonIndex = Ziwei.Configs.Branches.Indexes[locTonPosition];
  var branches = Ziwei.Configs.Branches.Names.allKeys();
  var stars = Ziwei.Configs.LocTonConstellation.Orders;

  return this.mergeSequencesFromIndex(branches, stars, locTonIndex, fateDirection == -1);
};
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

  var starsPositions = [
    [diaKhongPosition, 'dia_khong'],
    [diaKiepPosition, 'dia_kiep'],
    [kinhDuongPosition, 'kinh_duong'],
    [daLaPosition, 'da_la'],
    [hoaTinhPosition, 'hoa_tinh'],
    [linhTinhPosition, 'linh_tinh']
  ].toHashOfArrays();

  return starsPositions;
};
_Ziwei_Calculator.prototype.calcTaHuuPositions = function(birthMonth) {
  var thinIndex = Ziwei.Configs.Branches.Indexes['thin'];
  var birthMonthNumber = Ziwei.Configs.Branches.Indexes[birthMonth] - 2;

  var taPhuIndex = thinIndex.limitInc(birthMonthNumber-1);
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

  var starsPositions = [
    [taPhuPosition, 'ta_phu'],
    [huuBatPosition, 'huu_bat'],
    [vanXuongPosition, 'van_xuong'],
    [vanKhucPosition, 'van_khuc']
  ].toHashOfArrays();

  return starsPositions;
};
_Ziwei_Calculator.prototype.calcTuanCoordinate = function() {
  return [1, 1];
};

_Ziwei_Calculator.prototype.calcTrietCoordinate = function() {
  return [4, 3];
};
_Ziwei_Calculator.prototype.mergeSequencesFromIndex = function(firstSequence, secondSequence, mergeIndex, reversedOrder = false) {
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

_Ziwei_Calculator.prototype.insertSingleStarToPalace = function(palace, star, configModule) {
  if (star === undefined)
    return;

  var quality = Ziwei.Configs[configModule].Qualities[star];
  palace[`${quality}Stars`].push(star);
};

_Ziwei_Calculator.prototype.insertMultipleStarsToPalace = function(palace, stars, configModule) {
  if (stars === undefined || stars.constructor !== Array)
    return;

  ['good', 'bad'].forEach((quality) => {
    var qualifiedStars = stars.filter((star) => Ziwei.Configs[configModule].Qualities[star] === quality);
    return palace[`${quality}Stars`].push(...qualifiedStars);
  });

  // Another equivalent way
  // stars.forEach((star) => {
  //   var quality = Ziwei.Configs[configModule].Qualities[star];
  //   palace[`${quality}Stars`].push(star);
  // });
};
_Ziwei_Models_ResultPalace.prototype.renderHtml = function(palaceSource, useFullNames = true) {
  var buildMainStarName = function(star, position, useFullNames = true) {
    var starName = useFullNames ? star.getFullName('ForteenMainStars') : star.getShortName('ForteenMainStars');
    return starName + ` (${Ziwei.Configs.ForteenMainStars.Places[star][position]})`;
  };

  var renderStarsHtml = function(position, stars, customClass, useFullNames = true, isMainStars = true) {
    var source = '<span class="{{ class }}" style="{{ style }}">{{ star }}</span>';
    var template = Handlebars.compile(source);
    var html = stars.map((star) => {
      var starName = useFullNames ? star.getFullName() : star.getShortName();
      
      if (isMainStars)
        starName = buildMainStarName(star, position, useFullNames);

      var colorStyle = starName.getPlaceQualityColorStyle();
      var starHtml = template({star: starName, class: customClass, style: colorStyle});

      return starHtml;
    }).join("\n");

    return html;
  };

  var context = useFullNames ? this.getFullNames() : this.getShortNames();
  context.mainStars = renderStarsHtml(this.position, this.mainStars, 'main-star', useFullNames);
  context.goodStars = renderStarsHtml(this.position, this.goodStars, 'good-star', useFullNames, false);
  context.badStars = renderStarsHtml(this.position, this.badStars, 'bad-star', useFullNames, false);
  context.selfClass = context.name === 'Mệnh' ? 'self' : '';
  context.bodyClass = context.body === 'Thân' ? 'body' : '';

  var template = Handlebars.compile(palaceSource);
  var palaceHtml = template(context);

  return palaceHtml;
};

_Ziwei_Models_ResultTable.prototype.renderHtml = function(tableSource, palaceSource, centerInfoSource) {
  var template = Handlebars.compile(tableSource);
  var renderedPalaces = {};

  this.palaces.forEach((position, palace) => {
    renderedPalaces[position] = palace.renderHtml(palaceSource);
  });

  var tuanAbsPos = this.tuanCoordinate.convertPalaceCoordinateToPos();
  var trietAbsPos = this.trietCoordinate.convertPalaceCoordinateToPos();

  var context = {
    tuanPos: tuanAbsPos,
    trietPos: trietAbsPos,
    renderedPalaces: renderedPalaces,
    centerInfo: this.profile.renderHtml(centerInfoSource)
  }

  var tableHtml = template(context);
  return tableHtml;
};

_Ziwei_Models_ResultTable.prototype.drawConnectedLines = function(canvasId) {
  this.connectedCoordinates.forEach((coordinatePair, index) => {
    var [fromCoord, toCoord] = coordinatePair;
    var color = index === 0 ? "red" : "blue"; // Red line for opposite connection
    fromCoord.drawLineTo(toCoord, canvasId, color);
  });
};

_Ziwei_Models_Profile.prototype.renderHtml = function(centerInfoSource) {
  var template = Handlebars.compile(centerInfoSource);

  var ageGanZhi = this.birthYear.toString();
  var ageSymbol = Ziwei.Configs.Wuxing.AgeSymbols[ageGanZhi];
  var ageElement = Ziwei.Configs.Wuxing.AgeElements[ageGanZhi];

  var context = {
    name: this.name,
    birthHour: this.birthHour.getFullName('Branches'),
    birthDay: this.birthDay,
    birthMonth: this.birthMonth.getFullName('Branches'),
    birthYear: this.birthYear,
    ageSymbol: ageSymbol,
    ageSymbolColorStyle: ageElement.getElementColorStyle(),
    yinyangGender: this.yinyangGender,
    cucFullName: this.cucElement.getFullName("Wuxing"),
    cucNumber: this.cucNumber,
    cucElementColorStyle: this.cucElement.getElementColorStyle()
  };

  var centerInfoHtml = template(context);
  return centerInfoHtml;
};

_Ziwei_Calculator.renderHtml = function(resultTable) {
  var palaceSource = $("#palace-template").html();
  var tableSource = $("#result-template").html();
  var centerInfoSource = $("#center-info-template").html();

  // Insert table HTML
  var tableHtml = resultTable.renderHtml(tableSource, palaceSource, centerInfoSource);
  $("div#result-display").replaceWith(tableHtml);

  // Draw connected lines
  resultTable.drawConnectedLines('canvas');
}
  return {
    Configs: {
    BranchSets: _Ziwei_Configs_BranchSets,
    Branches: _Ziwei_Configs_Branches,
    ForteenMainStars: _Ziwei_Configs_ForteenMainStars,
    FourTransformationStars: _Ziwei_Configs_FourTransformationStars,
    Genders: _Ziwei_Configs_Genders,
    LocTonConstellation: _Ziwei_Configs_LocTonConstellation,
    NormalStars: _Ziwei_Configs_NormalStars,
    OtherImportantStars: _Ziwei_Configs_OtherImportantStars,
    Palaces: _Ziwei_Configs_Palaces,
    SixDeadlyStars: _Ziwei_Configs_SixDeadlyStars,
    SixLuckyStars: _Ziwei_Configs_SixLuckyStars,
    Stems: _Ziwei_Configs_Stems,
    ThaiTueConstellation: _Ziwei_Configs_ThaiTueConstellation,
    TrangSinhConstellation: _Ziwei_Configs_TrangSinhConstellation,
    TuanTriet: _Ziwei_Configs_TuanTriet,
    Wuxing: _Ziwei_Configs_Wuxing
  },
  Models: {
    GanZhi: _Ziwei_Models_GanZhi,
    Profile: _Ziwei_Models_Profile,
    ResultPalace: _Ziwei_Models_ResultPalace,
    ResultTable: _Ziwei_Models_ResultTable
  },
  Calculator: _Ziwei_Calculator
  };
  }(Ziwei));