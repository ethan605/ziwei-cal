'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Ziwei = (function () {
  Number.prototype.isEven = function () {
    return this % 2 === 0;
  };

  Number.prototype.quotient = function (divisor) {
    return (this - this % divisor) / divisor;
  };

  Number.prototype.limitInc = function () {
    var incStep = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var limit = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
    var minResult = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    var tempResult = this + incStep - 1;
    var paddingMult = 0;

    if (tempResult < minResult) paddingMult = (limit - tempResult).quotient(limit);

    return (tempResult + paddingMult * limit) % limit + minResult;
  };

  Number.prototype.reflectIndex = function () {
    var reflectThrough = arguments.length <= 0 || arguments[0] === undefined ? 2 : arguments[0];

    return reflectThrough.limitInc(-this + reflectThrough);
  };

  String.prototype.getDisplayName = function () {
    var moduleName = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
    var prefix = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

    if (moduleName !== undefined) return Ziwei.Configs[moduleName][prefix + 'Names'][this];

    var allNamesArr = ['ThaiTueConstellation', 'LocTonConstellation', 'SixDeadlyStars', 'SixLuckyStars', 'OtherImportantStars', 'NormalStars', 'FourTransformationStars'].map(function (moduleName) {
      return Ziwei.Configs['' + moduleName][prefix + 'Names'];
    });

    var allNames = Object.assign.apply(this, allNamesArr);
    return allNames[this];
  };

  String.prototype.getFullName = function () {
    var moduleName = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

    return this.getDisplayName(moduleName);
  };

  String.prototype.getShortName = function () {
    var moduleName = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

    return this.getDisplayName(moduleName, 'Short');
  };

  String.prototype.getElementColorStyle = function () {
    var color = Ziwei.Configs.Wuxing.ElementColors[this];
    return color === undefined ? "" : 'color: ' + color + ';';
  };

  String.prototype.getPlaceQualityColorStyle = function () {
    var regexPattern = /(?!\()(\w|Đ)(?=\))/gi;
    var quality = (this.match(regexPattern) || [])[0];
    var color = Ziwei.Configs.Wuxing.PlaceQualityColors[quality];

    return color === undefined ? "" : 'color: ' + color + ';';
  };

  Array.prototype.convertPalaceCoordinateToPos = function () {
    var margin = arguments.length <= 0 || arguments[0] === undefined ? { top: 8, left: 8 } : arguments[0];
    var useFullNames = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var _ref = _slicedToArray(this, 2);

    var xCoord = _ref[0];
    var yCoord = _ref[1];

    var tableSize = Ziwei.Models.ResultPalace.tableSize(useFullNames);
    var padding = 1;

    return {
      left: margin.left + (tableSize.width + padding) * (xCoord - 0.5) - 25,
      top: margin.top + (tableSize.height + padding) * yCoord - 8
    };
  };

  Array.prototype.convertLineOriginCoordinateToPos = function () {
    var useFullNames = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    var _ref2 = _slicedToArray(this, 2);

    var xCoord = _ref2[0];
    var yCoord = _ref2[1];

    var tableSize = Ziwei.Models.ResultPalace.tableSize(useFullNames);
    var padding = 1;

    return {
      left: (tableSize.width + padding) * xCoord,
      top: (tableSize.height + padding) * yCoord
    };
  };

  Array.prototype.drawLineTo = function (toCoord, canvasId) {
    var color = arguments.length <= 2 || arguments[2] === undefined ? 'black' : arguments[2];
    var useFullNames = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");

    context.beginPath();

    var fromPos = this.convertLineOriginCoordinateToPos(useFullNames);
    var toPos = toCoord.convertLineOriginCoordinateToPos(useFullNames);

    context.moveTo(fromPos.left, fromPos.top);
    context.lineTo(toPos.left, toPos.top);
    context.lineWidth = 1;

    context.strokeStyle = color;
    context.stroke();
  };

  Array.prototype.transpose = function () {
    var _self = this;
    return _self[0].map(function (_, index) {
      return _self.map(function (row) {
        return row[index];
      });
    });
  };

  Array.prototype.toHash = function () {
    return this.reduce(function (previous, current) {
      previous[current[0]] = current[1];
      return previous;
    }, {});
  };

  Array.prototype.toHashOfArrays = function () {
    return this.reduce(function (previous, current) {
      var _current = _slicedToArray(current, 2);

      var key = _current[0];
      var value = _current[1];

      previous[key] = previous[key] || [];
      previous[key].push(value);

      return previous;
    }, {});
  };

  Array.fromRange = function (from, to) {
    if (from === to) return [from];

    var _from = from,
        _to = to,
        reversed = false;

    if (from > to) {
      _from = to;
      _to = from;
      reversed = true;
    }

    var result = Array.apply(null, Array(_to - _from + 1)).map(function (_, index) {
      return _from + index;
    });

    if (reversed) result = result.reverse();

    return result;
  };

  Object.prototype.allKeys = function () {
    return Object.keys(this);
  };

  Object.prototype.allValues = function () {
    var _self = this;
    return Object.keys(_self).map(function (key) {
      return _self[key];
    });
  };

  Object.prototype.count = function () {
    return Object.keys(this).length;
  };

  Object.prototype.forEach = function (callback) {
    var _self = this;
    Object.keys(_self).forEach(function (key) {
      return callback(key, _self[key]);
    });
  };

  Object.prototype.mapKeyValues = function (callback) {
    var _self = this;
    return Object.keys(_self).map(function (key) {
      return callback(key, _self[key]);
    });
  };

  Object.prototype.findKeyValues = function (callback) {
    var _self = this;
    var results = {};
    Object.keys(_self).find(function (key) {
      if (callback(key, _self[key]) === true && results.count() === 0) results[key] = _self[key];
    });

    return results;
  };

  Object.prototype.findKey = function (callback) {
    var _self = this;
    return Object.keys(_self).find(function (key) {
      return callback(key, _self[key]);
    });
  };

  Object.prototype.filter = function (callback) {
    var _self = this;
    var results = {};
    Object.keys(_self).filter(function (key) {
      if (callback(key, _self[key]) === true) results[key] = _self[key];
    });

    return results;
  };

  Object.prototype.filterKeys = function (callback) {
    var _self = this;
    return Object.keys(_self).filter(function (key) {
      return callback(key, _self[key]);
    });
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

      ByRelatives: [['hoi', 'ty', 'suu'], ['dan', 'mao', 'thin'], ['ty2', 'ngo', 'mui'], ['than', 'dau', 'tuat']]
    },

    Duadrilogy: {}
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
      'tu_vi': { 'ty': "B", 'suu': "Đ", 'dan': "M", 'mao': "B", 'thin': "V", 'ty2': "M", 'ngo': "M", 'mui': "Đ", 'than': "M", 'dau': "B", 'tuat': "V", 'hoi': "B" },
      'thien_co': { 'ty': "Đ", 'suu': "Đ", 'dan': "H", 'mao': "M", 'thin': "M", 'ty2': "V", 'ngo': "Đ", 'mui': "Đ", 'than': "V", 'dau': "M", 'tuat': "M", 'hoi': "H" },
      'thai_duong': { 'ty': "H", 'suu': "Đ", 'dan': "V", 'mao': "V", 'thin': "V", 'ty2': "M", 'ngo': "M", 'mui': "Đ", 'than': "H", 'dau': "H", 'tuat': "H", 'hoi': "H" },
      'vu_khuc': { 'ty': "V", 'suu': "M", 'dan': "V", 'mao': "Đ", 'thin': "M", 'ty2': "H", 'ngo': "V", 'mui': "M", 'than': "V", 'dau': "Đ", 'tuat': "M", 'hoi': "H" },
      'thien_dong': { 'ty': "V", 'suu': "H", 'dan': "M", 'mao': "Đ", 'thin': "H", 'ty2': "Đ", 'ngo': "H", 'mui': "H", 'than': "M", 'dau': "H", 'tuat': "H", 'hoi': "Đ" },
      'liem_trinh': { 'ty': "V", 'suu': "Đ", 'dan': "V", 'mao': "H", 'thin': "M", 'ty2': "H", 'ngo': "V", 'mui': "Đ", 'than': "V", 'dau': "H", 'tuat': "M", 'hoi': "H" },
      'thien_phu': { 'ty': "M", 'suu': "B", 'dan': "M", 'mao': "B", 'thin': "V", 'ty2': "Đ", 'ngo': "M", 'mui': "Đ", 'than': "M", 'dau': "B", 'tuat': "V", 'hoi': "Đ" },
      'thai_am': { 'ty': "V", 'suu': "Đ", 'dan': "H", 'mao': "H", 'thin': "H", 'ty2': "H", 'ngo': "H", 'mui': "Đ", 'than': "V", 'dau': "M", 'tuat': "M", 'hoi': "M" },
      'tham_lang': { 'ty': "H", 'suu': "M", 'dan': "Đ", 'mao': "H", 'thin': "V", 'ty2': "H", 'ngo': "H", 'mui': "M", 'than': "Đ", 'dau': "H", 'tuat': "V", 'hoi': "H" },
      'cu_mon': { 'ty': "V", 'suu': "H", 'dan': "V", 'mao': "M", 'thin': "H", 'ty2': "H", 'ngo': "V", 'mui': "H", 'than': "Đ", 'dau': "M", 'tuat': "H", 'hoi': "Đ" },
      'thien_tuong': { 'ty': "V", 'suu': "Đ", 'dan': "M", 'mao': "H", 'thin': "V", 'ty2': "Đ", 'ngo': "V", 'mui': "Đ", 'than': "M", 'dau': "H", 'tuat': "V", 'hoi': "Đ" },
      'thien_luong': { 'ty': "V", 'suu': "Đ", 'dan': "V", 'mao': "V", 'thin': "M", 'ty2': "H", 'ngo': "M", 'mui': "Đ", 'than': "V", 'dau': "H", 'tuat': "M", 'hoi': "H" },
      'that_sat': { 'ty': "M", 'suu': "Đ", 'dan': "M", 'mao': "H", 'thin': "H", 'ty2': "V", 'ngo': "M", 'mui': "Đ", 'than': "M", 'dau': "H", 'tuat': "H", 'hoi': "V" },
      'pha_quan': { 'ty': "M", 'suu': "V", 'dan': "H", 'mao': "H", 'thin': "Đ", 'ty2': "H", 'ngo': "M", 'mui': "V", 'than': "H", 'dau': "H", 'tuat': "Đ", 'hoi': "H" }
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
  var _Ziwei_Models_GanZhi = (function () {
    function _Ziwei_Models_GanZhi() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, _Ziwei_Models_GanZhi);

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

      if (stemIndex < 0 || branchIndex < 0) throw "Invalid stem or branch";

      if (stemIndex.isEven() ^ branchIndex.isEven() === true) throw "Invalid stem-branch pair";
    }

    _createClass(_Ziwei_Models_GanZhi, [{
      key: 'toString',
      value: function toString() {
        return [Ziwei.Configs.Stems.Names[this.stem], Ziwei.Configs.Branches.Names[this.branch]].join(" ");
      }
    }]);

    return _Ziwei_Models_GanZhi;
  })();
  var _Ziwei_Models_Profile = (function () {
    function _Ziwei_Models_Profile() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, _Ziwei_Models_Profile);

      this.key = args['key'] || "keyname";
      this.name = args['name'] || "<N/A>";

      this.gender = args['gender'];
      if (Ziwei.Configs.Genders.Names[this.gender] === undefined) this.gender = 'male';

      this.birthHour = args['birthHour'] || args['hour'];
      if (Ziwei.Configs.Branches.Names[this.birthHour] === undefined) this.birthHour = 'ty';

      this.birthDay = args['birthDay'] || args['day'] || 1;
      if (this.birthDay <= 0 || this.birthDay > 30) this.birthDay = 1;

      this.birthMonth = args['birthMonth'] || args['month'];
      if (Ziwei.Configs.Branches.Names[this.birthMonth] === undefined) this.birthMonth = 'ty';

      var birthYear = args['birthYear'] || args['year'];
      this.birthYear = new Ziwei.Models.GanZhi(birthYear);

      var stemDirection = Ziwei.Configs.Stems.Directions[this.birthYear.stem];

      this.yinyangGender = [Ziwei.Configs.Stems.Yinyang[stemDirection], Ziwei.Configs.Genders.Names[this.gender]].join(" ");

      this.fateDirection = stemDirection * Ziwei.Configs.Genders.Directions[this.gender];
    }

    _createClass(_Ziwei_Models_Profile, [{
      key: 'updateCuc',
      value: function updateCuc(_cucElement, _cucNumber) {
        this.cucElement = _cucElement;
        this.cucNumber = _cucNumber;
      }
    }, {
      key: 'detail',
      value: function detail() {
        var t = [this.yinyangGender, Ziwei.Configs.Branches.Names[this.birthHour], this.birthDay, Ziwei.Configs.Branches.Names[this.birthMonth], this.birthYear];
        return t[0] + ', sinh giờ ' + t[1] + ' ngày ' + t[2] + ' tháng ' + t[3] + ' năm ' + t[4];
      }
    }, {
      key: 'toString',
      value: function toString() {
        var t = [this.name, this.yinyangGender, Ziwei.Configs.Branches.Names[this.birthHour], this.birthDay, Ziwei.Configs.Branches.Names[this.birthMonth], this.birthYear.inspect];
        return '<Ziwei.Models.Profile - Name: ' + t[0] + ' - Gender: ' + t[1] + ' - Birthday: ' + t[2] + ' ' + t[3] + '/' + t[4] + '/' + t[5] + '>';
      }
    }]);

    return _Ziwei_Models_Profile;
  })();
  var _Ziwei_Models_ResultPalace = (function () {
    function _Ziwei_Models_ResultPalace() {
      var configs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, _Ziwei_Models_ResultPalace);

      this.position = configs.position;
      this.name = configs.name;
      this.isBody = configs.isBody;
      this.mainStars = configs.mainStars;
      this.goodStars = configs.goodStars;
      this.badStars = configs.badStars;
      this.trangSinhConstellation = configs.trangSinhConstellation;
      this.opportunityAge = configs.opportunityAge;
    }

    _createClass(_Ziwei_Models_ResultPalace, [{
      key: 'getFullNames',
      value: function getFullNames() {
        var _self = this;

        return {
          position: _self.position.getFullName('Branches'),
          name: _self.name.getFullName('Palaces'),
          body: _self.isBody ? 'Thân' : '',
          mainStars: _self.mainStars.map(function (star) {
            var quality = Ziwei.Configs.ForteenMainStars.Places[star][_self.position];
            return star.getFullName('ForteenMainStars') + (' (' + quality + ')');
          }),
          goodStars: _self.goodStars.map(function (star) {
            return star.getFullName();
          }),
          badStars: _self.badStars.map(function (star) {
            return star.getFullName();
          }),
          trangSinhConstellation: _self.trangSinhConstellation.getFullName("TrangSinhConstellation"),
          opportunityAge: _self.opportunityAge
        };
      }
    }, {
      key: 'getShortNames',
      value: function getShortNames() {
        var _self = this;

        return {
          position: _self.position.getFullName('Branches'),
          name: _self.name.getShortName('Palaces'),
          body: _self.isBody ? 'Thân' : '',
          mainStars: _self.mainStars.map(function (star) {
            var quality = Ziwei.Configs.ForteenMainStars.Places[star][_self.position];
            return star.getShortName('ForteenMainStars') + (' (' + quality + ')');
          }),
          goodStars: _self.goodStars.map(function (star) {
            return star.getShortName();
          }),
          badStars: _self.badStars.map(function (star) {
            return star.getShortName();
          }),
          trangSinhConstellation: _self.trangSinhConstellation.getShortName("TrangSinhConstellation"),
          opportunityAge: _self.opportunityAge
        };
      }
    }]);

    return _Ziwei_Models_ResultPalace;
  })();
  var _Ziwei_Models_ResultTable = (function () {
    function _Ziwei_Models_ResultTable() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, _Ziwei_Models_ResultTable);

      this.profile = args['profile'];

      var palaceConfigs = args['palaces'];

      var allPalaces = {};
      palaceConfigs.forEach(function (position, config) {
        var palace = new Ziwei.Models.ResultPalace(Object.assign({ 'position': position }, config));
        allPalaces[position] = palace;
      });
      this.palaces = allPalaces;

      this.tuanCoordinate = args['tuanCoordinate'];
      this.trietCoordinate = args['trietCoordinate'];
      this.connectedCoordinates = args['connectedCoordinates'];
    }

    _createClass(_Ziwei_Models_ResultTable, [{
      key: 'renderTemplateContext',
      value: function renderTemplateContext() {
        var useFullNames = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        return {
          renderedPalaces: this.palaces.map(function (position, palace) {
            return palace.renderTemplateContext(useFullNames);
          }),
          centerInfo: 'Center Infomation!'
        };
      }
    }]);

    return _Ziwei_Models_ResultTable;
  })();
  var _Ziwei_Calculator = function _Ziwei_Calculator() {
    this.profiles = presetProfilesData();

    function presetProfilesData() {
      var rawData = [['anhctv', 'Chu Thị Vân Anh', 'Nữ', 'Mão', '14', 'Dần', 'Bính', 'Dần'], ['chind', 'Nguyễn Diệp Chi', 'Nữ', 'Mão', '23', 'Tỵ', 'Giáp', 'Ngọ'], ['dangnh', 'Nguyễn Hải Đăng', 'Nam', 'Thân', '1', 'Hợi', 'Tân', 'Mùi'], ['ducnm', 'Nguyễn Minh Đức', 'Nam', 'Mão', '15', 'Hợi', 'Mậu', 'Tý'], ['gianghh', 'Hà Hương Giang', 'Nữ', 'Dần', '7', 'Thìn', 'Tân', 'Mùi'], ['hainp', 'Nguyễn Phan Hải', 'Nam', 'Mùi', '12', 'Thìn', 'Tân', 'Mùi'], ['hoactq', 'Chu Thị Quỳnh Hoa', 'Nữ', 'Dần', '28', 'Thân', 'Tân', 'Mùi'], ['huonghh', 'Hàn Huyền Hương', 'Nữ', 'Tỵ', '20', 'Dần', 'Tân', 'Mùi'], ['huyennth', 'Nguyễn Thị Thu Huyền', 'Nữ', 'Tỵ', '5', 'Thìn', 'Giáp', 'Tý'], ['khoin', 'Nguyễn Khôi', 'Nam', 'Mùi', '2', 'Thìn', 'Tân', 'Mùi'], ['nam_1', 'Nam 1', 'Nam', 'Mão', '16', 'Ngọ', 'Quý', 'Dậu'], ['nam_2', 'Nam 2', 'Nam', 'Dần', '29', 'Tý', 'Kỷ', 'Mùi'], ['ngocpb', 'Phùng Bá Ngọc', 'Nam', 'Tý', '22', 'Sửu', 'Nhâm', 'Thân'], ['nu_1', 'Nữ 1', 'Nữ', 'Hợi', '10', 'Hợi', 'Giáp', 'Thìn'], ['nu_2', 'Nữ 2', 'Nữ', 'Mão', '3', 'Tuất', 'Canh', 'Ngọ'], ['nu_3', 'Nữ 3', 'Nữ', 'Dần', '24', 'Mùi', 'Đinh', 'Mão'], ['nu_4', 'Nữ 4', 'Nữ', 'Sửu', '29', 'Dần', 'Đinh', 'Sửu'], ['nu_5', 'Nữ 5', 'Nữ', 'Mùi', '14', 'Dậu', 'Quý', 'Dậu'], ['nu_6', 'Nữ 6', 'Nữ', 'Mão', '26', 'Ngọ', 'Tân', 'Hợi'], ['oanhntm', 'Nguyễn Thị Mai Oanh', 'Nữ', 'Tỵ', '14', 'Sửu', 'Giáp', 'Dần'], ['thanhnx', 'Nguyễn Xuân Thành', 'Nam', 'Tỵ', '22', 'Thìn', 'Tân', 'Mùi'], ['trungnt', 'Trung NT', 'Nam', 'Tý', '10', 'Ngọ', 'Nhâm', 'Tý'], ['trungnt2', 'Nguyễn Thành Trung', 'Nam', 'Hợi', '19', 'Dậu', 'Nhâm', 'Tuất'], ['trungpt', 'Phùng Thành Trung', 'Nam', 'Tý', '21', 'Mùi', 'Quý', 'Dậu'], ['tuanpm', 'Tuấn PM', 'Nam', 'Thân', '28', 'Thân', 'Ất', 'Mão'], ['yenbth', 'Bùi Thị Hải Yến', 'Nữ', 'Tuất', '12', 'Ngọ', 'Đinh', 'Mão']];

      var profiles = {};

      rawData.forEach(function (arr) {
        var profileData = {
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

        profiles[arr[0]] = new Ziwei.Models.Profile(profileData);
      });

      return profiles;
    }
  };

  _Ziwei_Calculator.prototype.calcResultTable = function (profile) {
    var _this = this;

    var _calcSelfBodyPosition = this.calcSelfBodyPosition(profile.birthHour, profile.birthMonth);

    var _calcSelfBodyPosition2 = _slicedToArray(_calcSelfBodyPosition, 2);

    var selfPosition = _calcSelfBodyPosition2[0];
    var bodyPosition = _calcSelfBodyPosition2[1];

    var palaces = this.calcPalacesPositions(selfPosition);

    var _calcCuc = this.calcCuc(selfPosition, profile.birthYear.stem);

    var _calcCuc2 = _slicedToArray(_calcCuc, 2);

    var cucElement = _calcCuc2[0];
    var cucNumber = _calcCuc2[1];

    profile.updateCuc(cucElement, cucNumber);

    var forteenMainStars = this.calcForteenMainStars(cucElement, cucNumber, profile.birthDay);
    var otherImportantStars = this.calcOtherImportantStars(profile.birthYear.stem, profile.birthYear.branch);
    var locTonPosition = otherImportantStars.findKey(function (position, stars) {
      return stars.includes('loc_ton');
    });

    var opportunityAges = this.calcOpportunityAges(selfPosition, cucNumber, profile.fateDirection);

    var thaiTueConstellation = this.calcThaiTueConstellation(profile.birthYear.branch);
    var trangSinhConstellation = this.calcTrangSinhConstellation(cucNumber, profile.fateDirection);
    var locTonConstellation = this.calcLocTonConstellation(locTonPosition, profile.fateDirection);

    var sixDeadlyStars = this.calcSixDeadlyStars(profile.birthHour, locTonPosition, profile.birthYear.branch);
    var sixLuckyStars = this.calcSixLuckyStars(profile.birthMonth, profile.birthHour);

    var normalStars = this.calcNormalStars(profile.birthMonth, profile.birthYear.branch);
    var fourTransformationStars = this.calcFourTransformationStars(profile.birthYear.stem, forteenMainStars, sixLuckyStars);

    var branches = Ziwei.Configs.Branches.Names.allKeys();
    var table = {};

    branches.forEach(function (branch) {
      table[branch] = {
        'name': palaces[branch],
        'isBody': branch === bodyPosition,
        'mainStars': forteenMainStars[branch] || [],
        'trangSinhConstellation': trangSinhConstellation[branch],
        'goodStars': [],
        'badStars': [],
        'opportunityAge': opportunityAges[branch]
      };

      // Classify by qualities
      var stars = otherImportantStars[branch];
      _this.insertMultipleStarsToPalace(table[branch], stars, 'OtherImportantStars');

      stars = sixDeadlyStars[branch];
      _this.insertMultipleStarsToPalace(table[branch], stars, 'SixDeadlyStars');

      stars = sixLuckyStars[branch];
      _this.insertMultipleStarsToPalace(table[branch], stars, 'SixLuckyStars');

      var star = thaiTueConstellation[branch];
      _this.insertSingleStarToPalace(table[branch], star, 'ThaiTueConstellation');

      star = locTonConstellation[branch];
      _this.insertSingleStarToPalace(table[branch], star, 'LocTonConstellation');

      stars = normalStars[branch];
      _this.insertMultipleStarsToPalace(table[branch], stars, 'NormalStars');

      stars = fourTransformationStars[branch];
      _this.insertMultipleStarsToPalace(table[branch], stars, 'FourTransformationStars');
    });

    var resultTable = new Ziwei.Models.ResultTable({
      'profile': profile,
      'palaces': table,
      'tuanCoordinate': this.calcTuanCoordinate(),
      'trietCoordinate': this.calcTrietCoordinate(),
      'connectedCoordinates': this.calcConnectedPalaceCoordinates(selfPosition)
    });

    return resultTable;
  };

  _Ziwei_Calculator.prototype.calculatePresetProfile = function () {
    var profileKey = arguments.length <= 0 || arguments[0] === undefined ? 'thanhnx' : arguments[0];

    this.currentProfile = this.profiles[profileKey];

    if (this.currentProfile === undefined) {
      throw "Invalid profile key";
      return;
    }

    return this.calcResultTable(this.currentProfile);
  };

  _Ziwei_Calculator.prototype.calculateUserInputProfile = function () {
    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    this.currentProfile = new Ziwei.Models.Profile(args);
    return this.calcResultTable(this.currentProfile);
  };

  _Ziwei_Calculator.prototype.calculateCurrentProfile = function () {
    return this.calcResultTable(this.currentProfile);
  };
  _Ziwei_Calculator.prototype.calcSelfBodyPosition = function (birthHour, birthMonth) {
    var hourIndex = Ziwei.Configs.Branches.Indexes[birthHour];
    var monthIndex = Ziwei.Configs.Branches.Indexes[birthMonth];

    var selfIndex = monthIndex.limitInc(-hourIndex + 1);
    var bodyIndex = monthIndex.limitInc(hourIndex - 1);

    return [Ziwei.Configs.Branches.Orders[selfIndex], Ziwei.Configs.Branches.Orders[bodyIndex]];
  };

  _Ziwei_Calculator.prototype.calcCuc = function (selfPosition, birthYearStem) {
    var startElement = Ziwei.Configs.Wuxing.ElementsByBranches[selfPosition];
    var startElementIndex = Ziwei.Configs.Wuxing.Elements.indexOf(startElement);

    var countingSteps = Ziwei.Configs.Stems.Indexes[birthYearStem];
    var cucIndex = startElementIndex.limitInc(countingSteps, 5, 0);

    var cucElement = Ziwei.Configs.Wuxing.Elements[cucIndex];
    var cucNumber = Ziwei.Configs.Wuxing.CucByElements[cucElement];

    return [cucElement, cucNumber];
  };

  _Ziwei_Calculator.prototype.calcPalacesPositions = function (selfPosition) {
    var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
    var branches = Ziwei.Configs.Branches.Names.allKeys();
    var palaces = Ziwei.Configs.Palaces.Orders;

    return this.mergeSequencesFromIndex(branches, palaces, selfIndex);
  };

  _Ziwei_Calculator.prototype.calcOpportunityAges = function (selfPosition, cucNumber, fateDirection) {
    var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
    var branches = Ziwei.Configs.Branches.Names.allKeys();
    var ages = Array.fromRange(0, 11).map(function (mult) {
      return cucNumber + 10 * mult;
    });

    return this.mergeSequencesFromIndex(branches, ages, selfIndex, fateDirection === -1);
  };

  _Ziwei_Calculator.prototype.calcConnectedPalaceCoordinates = function (selfPosition) {
    var selfIndex = Ziwei.Configs.Branches.Indexes[selfPosition];
    var selfCoordinate = Ziwei.Configs.Palaces.DrawingRootCoordinates[selfPosition];

    var oppositeIndex = selfIndex.limitInc(6);
    var oppositePosition = Ziwei.Configs.Branches.Orders[oppositeIndex];
    var oppositeCoordinate = Ziwei.Configs.Palaces.DrawingRootCoordinates[oppositePosition];

    var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[selfPosition];
    var sameSetPositions = Ziwei.Configs.BranchSets.Trilogy.ByElements[trilogyElement].slice();
    var selfPositionIndex = sameSetPositions.indexOf(selfPosition);
    sameSetPositions.splice(selfPositionIndex, 1); // Remove selfPosition element

    var sameSetCoordinates = sameSetPositions.map(function (position) {
      return Ziwei.Configs.Palaces.DrawingRootCoordinates[position];
    });

    var coordinates = [oppositeCoordinate];
    coordinates.push.apply(coordinates, _toConsumableArray(sameSetCoordinates));

    return coordinates.map(function (fromCoordinate) {
      return [fromCoordinate, selfCoordinate];
    });
  };
  _Ziwei_Calculator.prototype.calcTuViPosition = function (cucElement, cucNumber, birthDay) {
    var mod = birthDay % cucNumber;
    var quotient = birthDay.quotient(cucNumber);
    var tuViIndex = 1;

    if (mod === 0) {
      var danIndex = Ziwei.Configs.Branches.Indexes['dan'];
      tuViIndex = danIndex.limitInc(quotient - 1);

      return Ziwei.Configs.Branches.Orders[tuViIndex];
    }

    // mod > 0
    var kmtlnTable = Ziwei.Configs.Wuxing.KmtlnTable.allValues();
    var kmtlnStart = kmtlnTable.indexOf(Ziwei.Configs.Wuxing.KmtlnTable[cucElement]);
    var kmtlnIndex = kmtlnStart + mod - 1;
    var countingStartPosition = kmtlnTable[kmtlnIndex];

    if (birthDay < cucNumber) return countingStartPosition;

    // mod > 0 & birthDay > cucNumber
    var countingStartIndex = Ziwei.Configs.Branches.Indexes[countingStartPosition];
    tuViIndex = countingStartIndex.limitInc(quotient);

    return Ziwei.Configs.Branches.Orders[tuViIndex];
  };

  // Cơ (Thiên Cơ); Liêm (Liêm Trinh) & Vũ (Vũ Khúc)
  _Ziwei_Calculator.prototype.calcCoLiemVuPositions = function (tuViPosition) {
    var tuViIndex = Ziwei.Configs.Branches.Indexes[tuViPosition];

    return [Ziwei.Configs.Branches.Orders[tuViIndex.limitInc(-1)], Ziwei.Configs.Branches.Orders[tuViIndex.limitInc(4)], Ziwei.Configs.Branches.Orders[tuViIndex.limitInc(-4)]];
  };

  // Nhật (Thái Dương) & Đồng (Thiên Đồng)
  _Ziwei_Calculator.prototype.calcNhatDongPositions = function (vuKhucPosition) {
    var vuKhucIndex = Ziwei.Configs.Branches.Indexes[vuKhucPosition];

    return [Ziwei.Configs.Branches.Orders[vuKhucIndex.limitInc(1)], Ziwei.Configs.Branches.Orders[vuKhucIndex.limitInc(-1)]];
  };

  // Phá (Phá Quân)
  _Ziwei_Calculator.prototype.calcPhaQuanPosition = function (tuViPosition) {
    var tuViIndex = Ziwei.Configs.Branches.Indexes[tuViPosition];
    return Ziwei.Configs.Branches.Orders[tuViIndex.reflectIndex()];
  };

  // Phủ - Nguyệt - Tham - Cự - Tướng - Lương - Sát
  _Ziwei_Calculator.prototype.calcThienPhuConstellationPositions = function (phaQuanPosition) {
    var phaQuanIndex = Ziwei.Configs.Branches.Indexes[phaQuanPosition];

    // Thiên Phủ
    var thienPhuIndex = phaQuanIndex.limitInc(2);
    var constelationPositions = [Ziwei.Configs.Branches.Orders[thienPhuIndex]];

    // Nguyệt - Tham - Cự - Tướng - Lương - Sát
    Array.fromRange(1, 6).forEach(function () {
      thienPhuIndex = thienPhuIndex.limitInc();
      constelationPositions.push(Ziwei.Configs.Branches.Orders[thienPhuIndex]);
    });

    return constelationPositions;
  };

  _Ziwei_Calculator.prototype.calcForteenMainStars = function (cucElement, cucNumber, birthDay) {
    var stars = ['tu_vi', 'thien_co', 'liem_trinh', 'vu_khuc', 'thai_duong', 'thien_dong', 'pha_quan', 'thien_phu', 'thai_am', 'tham_lang', 'cu_mon', 'thien_tuong', 'thien_luong', 'that_sat'];

    var starsPositions = [];

    var tuVi = this.calcTuViPosition(cucElement, cucNumber, birthDay);
    starsPositions.push(tuVi);
    starsPositions.push.apply(starsPositions, _toConsumableArray(this.calcCoLiemVuPositions(tuVi)));
    starsPositions.push.apply(starsPositions, _toConsumableArray(this.calcNhatDongPositions(starsPositions[3])));

    var phaQuan = this.calcPhaQuanPosition(tuVi);
    starsPositions.push(phaQuan);
    starsPositions.push.apply(starsPositions, _toConsumableArray(this.calcThienPhuConstellationPositions(phaQuan)));

    var mainStarsPositions = {};

    stars.forEach(function (star, index) {
      var key = starsPositions[index];

      if (mainStarsPositions[key] === undefined) mainStarsPositions[key] = [];

      mainStarsPositions[key].push(star);
    });

    return mainStarsPositions;
  };
  _Ziwei_Calculator.prototype.calcFourTransformationStars = function (birthYearStem, forteenMainStars, sixLuckyStars) {
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

    var forTransformationPositions = positionsByStems[birthYearStem].map(function (transformationStar) {
      var mainStarPosition = forteenMainStars.findKey(function (position) {
        return forteenMainStars[position].includes(transformationStar);
      });

      if (mainStarPosition !== undefined) return mainStarPosition;

      var otherStarPosition = sixLuckyStars.findKey(function (position) {
        return sixLuckyStars[position].includes(transformationStar);
      });

      return otherStarPosition;
    });

    var starsPositions = [forTransformationPositions, ['hoa_loc', 'hoa_quyen', 'hoa_khoa', 'hoa_ky']].transpose().toHashOfArrays();

    return starsPositions;
  };
  // Thiên Hình - Thiên Diêu
  _Ziwei_Calculator.prototype.calcHinhDieuYPositions = function (birthMonth) {
    var birthMonthNumber = Ziwei.Configs.Branches.Indexes[birthMonth] - 2;

    var dauIndex = Ziwei.Configs.Branches.Indexes['dau'];
    var thienHinhIndex = dauIndex.limitInc(birthMonthNumber - 1);

    var suuIndex = Ziwei.Configs.Branches.Indexes['suu'];
    var thienDieuIndex = suuIndex.limitInc(birthMonthNumber - 1);
    var thienYIndex = thienDieuIndex;

    return [Ziwei.Configs.Branches.Orders[thienHinhIndex], Ziwei.Configs.Branches.Orders[thienDieuIndex], Ziwei.Configs.Branches.Orders[thienYIndex]];
  };

  _Ziwei_Calculator.prototype.calcHoaCaiPosition = function (birthYearBranch) {
    var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[birthYearBranch];
    var hoaCaiPosition = Ziwei.Configs.BranchSets.Trilogy.ByElements[trilogyElement][1];

    return hoaCaiPosition;
  };

  _Ziwei_Calculator.prototype.calcAmSatPosition = function (birthMonth) {
    // By month:              6, 12   1, 7  2, 8   3, 9    4, 10  5, 11
    var possiblePositions = ['thin', 'dan', 'ty', 'tuat', 'than', 'ngo'];
    var birthMonthNumber = Ziwei.Configs.Branches.Indexes[birthMonth] - 2;
    var amSatPosition = possiblePositions[birthMonthNumber % 6];

    return amSatPosition;
  };

  _Ziwei_Calculator.prototype.calcCoQuaPositions = function (birthYearBranch) {
    var birthYearIndex = Ziwei.Configs.Branches.Indexes[birthYearBranch];
    var branchSetOrder = (birthYearIndex.limitInc() - 1).quotient(3);
    var branchSet = Ziwei.Configs.BranchSets.Trilogy.ByRelatives[branchSetOrder];
    var branchSetIndexes = branchSet.map(function (branch) {
      return Ziwei.Configs.Branches.Indexes[branch];
    });

    var coThanIndex = branchSetIndexes[0].limitInc(-1);
    var quaTuIndex = branchSetIndexes[2].limitInc();

    return [Ziwei.Configs.Branches.Orders[coThanIndex], Ziwei.Configs.Branches.Orders[quaTuIndex]];
  };

  _Ziwei_Calculator.prototype.calcKhocHuPositions = function (birthYearBranch) {
    var ngoIndex = Ziwei.Configs.Branches.Indexes['ngo'];
    var birthYearIndex = Ziwei.Configs.Branches.Indexes[birthYearBranch];

    var thienKhocIndex = ngoIndex.limitInc(-birthYearIndex + 1);
    var thienHuIndex = ngoIndex.limitInc(birthYearIndex - 1);

    return [Ziwei.Configs.Branches.Orders[thienKhocIndex], Ziwei.Configs.Branches.Orders[thienHuIndex]];
  };

  _Ziwei_Calculator.prototype.calcNormalStars = function (birthMonth, birthYearBranch) {
    var _calcHinhDieuYPositions = this.calcHinhDieuYPositions(birthMonth);

    var _calcHinhDieuYPositions2 = _slicedToArray(_calcHinhDieuYPositions, 3);

    var thienHinhPosition = _calcHinhDieuYPositions2[0];
    var thienDieuPosition = _calcHinhDieuYPositions2[1];
    var thienYPosition = _calcHinhDieuYPositions2[2];

    var hoaCaiPosition = this.calcHoaCaiPosition(birthYearBranch);
    var amSatPosition = this.calcAmSatPosition(birthMonth);

    var _calcCoQuaPositions = this.calcCoQuaPositions(birthYearBranch);

    var _calcCoQuaPositions2 = _slicedToArray(_calcCoQuaPositions, 2);

    var coThanPosition = _calcCoQuaPositions2[0];
    var quaTuPosition = _calcCoQuaPositions2[1];

    var _calcKhocHuPositions = this.calcKhocHuPositions(birthYearBranch);

    var _calcKhocHuPositions2 = _slicedToArray(_calcKhocHuPositions, 2);

    var thienKhocPosition = _calcKhocHuPositions2[0];
    var thienHuPosition = _calcKhocHuPositions2[1];

    var starsPositions = [[thienHinhPosition, 'thien_hinh'], [thienDieuPosition, 'thien_dieu'], [thienYPosition, 'thien_y'], [hoaCaiPosition, 'hoa_cai'], [amSatPosition, 'am_sat'], [coThanPosition, 'co_than'], [quaTuPosition, 'qua_tu'], [thienKhocPosition, 'thien_khoc'], [thienHuPosition, 'thien_hu']].toHashOfArrays();

    return starsPositions;
  };
  _Ziwei_Calculator.prototype.calcLocTonPosition = function (birthYearStem) {
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

  _Ziwei_Calculator.prototype.calcThienMaPosition = function (birthYearBranch) {
    var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[birthYearBranch];
    var firstBranch = Ziwei.Configs.BranchSets.Trilogy.ByElements[trilogyElement][0];
    var firstBranchIndex = Ziwei.Configs.Branches.Indexes[firstBranch];
    var reflectBranchIndex = firstBranchIndex.limitInc(6);

    return Ziwei.Configs.Branches.Orders[reflectBranchIndex];
  };

  _Ziwei_Calculator.prototype.calcOtherImportantStars = function (birthYearStem, birthYearBranch) {
    var locTonPosition = this.calcLocTonPosition(birthYearStem);
    var thienMaPosition = this.calcThienMaPosition(birthYearBranch);

    var importantStars = {};

    if (importantStars[locTonPosition] === undefined) importantStars[locTonPosition] = [];
    importantStars[locTonPosition].push('loc_ton');

    if (importantStars[thienMaPosition] === undefined) importantStars[thienMaPosition] = [];
    importantStars[thienMaPosition].push('thien_ma');

    return importantStars;
  };
  _Ziwei_Calculator.prototype.calcThaiTueConstellation = function (birthYearBranch) {
    var thaiTueIndex = Ziwei.Configs.Branches.Indexes[birthYearBranch];
    var branches = Ziwei.Configs.Branches.Names.allKeys();
    var stars = Ziwei.Configs.ThaiTueConstellation.Orders;

    return this.mergeSequencesFromIndex(branches, stars, thaiTueIndex);
  };

  _Ziwei_Calculator.prototype.calcTrangSinhConstellation = function (cucNumber, fateDirection) {
    var possiblePositions = ['than', 'hoi', 'ty2', 'than', 'dan'];
    var trangSinhPosition = possiblePositions[cucNumber - 2];
    var trangSinhIndex = Ziwei.Configs.Branches.Indexes[trangSinhPosition];

    var branches = Ziwei.Configs.Branches.Names.allKeys();
    var stars = Ziwei.Configs.TrangSinhConstellation.Orders.slice();

    return this.mergeSequencesFromIndex(branches, stars, trangSinhIndex, fateDirection == -1);
  };

  _Ziwei_Calculator.prototype.calcLocTonConstellation = function (locTonPosition, fateDirection) {
    var locTonIndex = Ziwei.Configs.Branches.Indexes[locTonPosition];
    var branches = Ziwei.Configs.Branches.Names.allKeys();
    var stars = Ziwei.Configs.LocTonConstellation.Orders;

    return this.mergeSequencesFromIndex(branches, stars, locTonIndex, fateDirection == -1);
  };
  _Ziwei_Calculator.prototype.calcKhongKiepPositions = function (birthHour) {
    var hoiIndex = Ziwei.Configs.Branches.Indexes['hoi'];
    var birthHourIndex = Ziwei.Configs.Branches.Indexes[birthHour];

    var diaKhongIndex = hoiIndex.limitInc(-birthHourIndex + 1);
    var diaKiepIndex = hoiIndex.limitInc(birthHourIndex - 1);

    return [Ziwei.Configs.Branches.Orders[diaKhongIndex], Ziwei.Configs.Branches.Orders[diaKiepIndex]];
  };

  _Ziwei_Calculator.prototype.calcKinhDaPositions = function (locTonPosition) {
    var locTonIndex = Ziwei.Configs.Branches.Indexes[locTonPosition];

    var kinhDuongIndex = locTonIndex.limitInc();
    var daLaIndex = locTonIndex.limitInc(-1);

    return [Ziwei.Configs.Branches.Orders[kinhDuongIndex], Ziwei.Configs.Branches.Orders[daLaIndex]];
  };

  _Ziwei_Calculator.prototype.calcHoaLinhPositions = function (birthYearBranch, birthHour) {
    var startPositions = {
      'hoa': ['suu', 'mao'],
      'thuy': ['dau', 'tuat'],
      'moc': ['dan', 'tuat'],
      'kim': ['mao', 'tuat']
    };

    var birthHourIndex = Ziwei.Configs.Branches.Indexes[birthHour];

    var trilogyElement = Ziwei.Configs.BranchSets.Trilogy.ByBranches[birthYearBranch];

    var _startPositions$trilogyElement = _slicedToArray(startPositions[trilogyElement], 2);

    var hoaTinhStartPos = _startPositions$trilogyElement[0];
    var linhTinhStartPos = _startPositions$trilogyElement[1];

    var hoaTinhStartIndex = Ziwei.Configs.Branches.Indexes[hoaTinhStartPos];
    var linhTinhStartIndex = Ziwei.Configs.Branches.Indexes[linhTinhStartPos];

    var hoaTinhIndex = hoaTinhStartIndex.limitInc(birthHourIndex - 1);
    var linhTinhIndex = linhTinhStartIndex.limitInc(-birthHourIndex + 1);

    return [Ziwei.Configs.Branches.Orders[hoaTinhIndex], Ziwei.Configs.Branches.Orders[linhTinhIndex]];
  };

  _Ziwei_Calculator.prototype.calcSixDeadlyStars = function (birthHour, locTonPosition, birthYearBranch) {
    var _calcKhongKiepPositions = this.calcKhongKiepPositions(birthHour);

    var _calcKhongKiepPositions2 = _slicedToArray(_calcKhongKiepPositions, 2);

    var diaKhongPosition = _calcKhongKiepPositions2[0];
    var diaKiepPosition = _calcKhongKiepPositions2[1];

    var _calcKinhDaPositions = this.calcKinhDaPositions(locTonPosition);

    var _calcKinhDaPositions2 = _slicedToArray(_calcKinhDaPositions, 2);

    var kinhDuongPosition = _calcKinhDaPositions2[0];
    var daLaPosition = _calcKinhDaPositions2[1];

    var _calcHoaLinhPositions = this.calcHoaLinhPositions(birthYearBranch, birthHour);

    var _calcHoaLinhPositions2 = _slicedToArray(_calcHoaLinhPositions, 2);

    var hoaTinhPosition = _calcHoaLinhPositions2[0];
    var linhTinhPosition = _calcHoaLinhPositions2[1];

    var starsPositions = [[diaKhongPosition, 'dia_khong'], [diaKiepPosition, 'dia_kiep'], [kinhDuongPosition, 'kinh_duong'], [daLaPosition, 'da_la'], [hoaTinhPosition, 'hoa_tinh'], [linhTinhPosition, 'linh_tinh']].toHashOfArrays();

    return starsPositions;
  };
  _Ziwei_Calculator.prototype.calcTaHuuPositions = function (birthMonth) {
    var thinIndex = Ziwei.Configs.Branches.Indexes['thin'];
    var birthMonthNumber = Ziwei.Configs.Branches.Indexes[birthMonth] - 2;

    var taPhuIndex = thinIndex.limitInc(birthMonthNumber - 1);
    var huuBatIndex = taPhuIndex.reflectIndex();

    return [Ziwei.Configs.Branches.Orders[taPhuIndex], Ziwei.Configs.Branches.Orders[huuBatIndex]];
  };

  _Ziwei_Calculator.prototype.calcXuongKhucPositions = function (birthHour) {
    var thinIndex = Ziwei.Configs.Branches.Indexes['thin'];
    var birthHourIndex = Ziwei.Configs.Branches.Indexes[birthHour];

    var vanKhucIndex = thinIndex.limitInc(birthHourIndex - 1);
    var vanXuongIndex = vanKhucIndex.reflectIndex();

    return [Ziwei.Configs.Branches.Orders[vanXuongIndex], Ziwei.Configs.Branches.Orders[vanKhucIndex]];
  };

  _Ziwei_Calculator.prototype.calcSixLuckyStars = function (birthMonth, birthHour) {
    var _calcTaHuuPositions = this.calcTaHuuPositions(birthMonth);

    var _calcTaHuuPositions2 = _slicedToArray(_calcTaHuuPositions, 2);

    var taPhuPosition = _calcTaHuuPositions2[0];
    var huuBatPosition = _calcTaHuuPositions2[1];

    var _calcXuongKhucPositions = this.calcXuongKhucPositions(birthHour);

    var _calcXuongKhucPositions2 = _slicedToArray(_calcXuongKhucPositions, 2);

    var vanXuongPosition = _calcXuongKhucPositions2[0];
    var vanKhucPosition = _calcXuongKhucPositions2[1];

    var starsPositions = [[taPhuPosition, 'ta_phu'], [huuBatPosition, 'huu_bat'], [vanXuongPosition, 'van_xuong'], [vanKhucPosition, 'van_khuc']].toHashOfArrays();

    return starsPositions;
  };
  _Ziwei_Calculator.prototype.calcTuanCoordinate = function () {
    return [1, 1];
  };

  _Ziwei_Calculator.prototype.calcTrietCoordinate = function () {
    return [4, 3];
  };
  _Ziwei_Calculator.prototype.mergeSequencesFromIndex = function (firstSequence, secondSequence, mergeIndex) {
    var reversedOrder = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var secondSeq = secondSequence.slice();

    // re-arrange second sequence in order of first one,
    // skip if mergeIndex is 1 (2 sequences have identical order)
    if (mergeIndex != 1) {
      var firstHalf = [];
      var secondHalf = [];

      if (!reversedOrder) {
        firstHalf = secondSeq.slice(12 - mergeIndex + 1, secondSeq.length);
        secondHalf = secondSeq.slice(0, 12 - mergeIndex + 1);
      } else {
        firstHalf = secondSeq.slice(0, mergeIndex).reverse();
        secondHalf = secondSeq.slice(mergeIndex, secondSeq.length).reverse();
      }

      secondSeq = firstHalf.concat(secondHalf);
    }

    return [firstSequence, secondSeq].transpose().toHash();
  };

  _Ziwei_Calculator.prototype.insertSingleStarToPalace = function (palace, star, configModule) {
    if (star === undefined) return;

    var quality = Ziwei.Configs[configModule].Qualities[star];
    palace[quality + 'Stars'].push(star);
  };

  _Ziwei_Calculator.prototype.insertMultipleStarsToPalace = function (palace, stars, configModule) {
    if (stars === undefined || stars.constructor !== Array) return;

    ['good', 'bad'].forEach(function (quality) {
      var _palace;

      var qualifiedStars = stars.filter(function (star) {
        return Ziwei.Configs[configModule].Qualities[star] === quality;
      });
      return (_palace = palace[quality + 'Stars']).push.apply(_palace, _toConsumableArray(qualifiedStars));
    });

    // Another equivalent way
    // stars.forEach((star) => {
    //   var quality = Ziwei.Configs[configModule].Qualities[star];
    //   palace[`${quality}Stars`].push(star);
    // });
  };
  _Ziwei_Models_ResultPalace.tableSize = function () {
    var useFullNames = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    return {
      'width': useFullNames ? 260 : 140,
      'height': useFullNames ? 170 : 170
    };
  };

  _Ziwei_Models_ResultTable.tableSize = function () {
    var useFullNames = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    var palaceSize = Ziwei.Models.ResultPalace.tableSize(useFullNames);

    return {
      'width': 4 + palaceSize.width * 4,
      'height': 4 + palaceSize.height * 4
    };
  };

  _Ziwei_Models_ResultPalace.prototype.renderHtml = function (palaceSource) {
    var useFullNames = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var buildMainStarName = function buildMainStarName(star, position) {
      var useFullNames = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var starName = useFullNames ? star.getFullName('ForteenMainStars') : star.getShortName('ForteenMainStars');
      return starName + (' (' + Ziwei.Configs.ForteenMainStars.Places[star][position] + ')');
    };

    var renderStarsHtml = function renderStarsHtml(position, stars, customClass) {
      var useFullNames = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
      var isMainStars = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

      var source = '<span class="{{ class }}" style="{{ style }}">{{ star }}</span>';
      var template = Handlebars.compile(source);
      var html = stars.map(function (star) {
        var starName = useFullNames ? star.getFullName() : star.getShortName();

        if (isMainStars) starName = buildMainStarName(star, position, useFullNames);

        var colorStyle = starName.getPlaceQualityColorStyle();
        var starHtml = template({ star: starName, 'class': customClass, style: colorStyle });

        return starHtml;
      }).join("\n");

      return html;
    };

    var context = useFullNames ? this.getFullNames() : this.getShortNames();
    context.size = Ziwei.Models.ResultPalace.tableSize(useFullNames);
    context.mainStars = renderStarsHtml(this.position, this.mainStars, 'main-star', useFullNames);
    context.goodStars = renderStarsHtml(this.position, this.goodStars, 'good-star', useFullNames, false);
    context.badStars = renderStarsHtml(this.position, this.badStars, 'bad-star', useFullNames, false);
    context.selfClass = context.name === 'Mệnh' ? 'self' : '';
    context.bodyClass = context.body === 'Thân' ? 'body' : '';

    var template = Handlebars.compile(palaceSource);
    var palaceHtml = template(context);

    return palaceHtml;
  };

  _Ziwei_Models_ResultTable.prototype.renderHtml = function (tableSource, palaceSource, centerInfoSource) {
    var useFullNames = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

    var template = Handlebars.compile(tableSource);
    var renderedPalaces = {};

    this.palaces.forEach(function (position, palace) {
      renderedPalaces[position] = palace.renderHtml(palaceSource, useFullNames);
    });

    var context = {
      'canvas': Ziwei.Models.ResultTable.tableSize(useFullNames),
      'tuanPos': { top: -100, left: -100 },
      'trietPos': { top: -100, left: -100 },
      'renderedPalaces': renderedPalaces,
      'centerInfo': this.profile.renderHtml(centerInfoSource)
    };

    var tableHtml = template(context);
    return tableHtml;
  };

  _Ziwei_Models_ResultTable.prototype.drawConnectedLines = function (canvasId) {
    var useFullNames = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    this.connectedCoordinates.forEach(function (coordinatePair, index) {
      var _coordinatePair = _slicedToArray(coordinatePair, 2);

      var fromCoord = _coordinatePair[0];
      var toCoord = _coordinatePair[1];

      var color = index === 0 ? "red" : "blue"; // Red line for opposite connection
      fromCoord.drawLineTo(toCoord, canvasId, color, useFullNames);
    });
  };

  _Ziwei_Models_Profile.prototype.renderHtml = function (centerInfoSource) {
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

  _Ziwei_Calculator.renderHtml = function (resultTable) {
    var useFullNames = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var palaceSource = $('#palace-template').html();
    var tableSource = $('#result-template').html();
    var centerInfoSource = $('#center-info-template').html();

    // Insert table HTML
    var tableHtml = resultTable.renderHtml(tableSource, palaceSource, centerInfoSource, useFullNames);
    $('div#result-display').replaceWith(tableHtml);

    // Change HTML page attributes
    document.title = resultTable.profile.name + " - Ziwei Calculator in JS";
    var tableSize = Ziwei.Models.ResultTable.tableSize(useFullNames);
    $('body').width(tableSize.width);

    // Re-position Tuan & Triet
    var padding = $('#result-display').position();
    ['tuan', 'triet'].forEach(function (star) {
      var starAbsPos = resultTable[star + 'Coordinate'].convertPalaceCoordinateToPos(padding, useFullNames);
      $('#' + star + '-khong').css(starAbsPos);
    });

    // Draw connected lines
    resultTable.drawConnectedLines('connected-lines', useFullNames);
  };
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
})(Ziwei);
function checkMobileDevice() {
  return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(navigator.userAgent)
  );
};

function setupDropdownValues() {
  // Birth dates: 1 - 30
  var dates = Array.fromRange(1, 30).map(function (day) {
    return '<option value="' + day + '">' + day + '</value>';
  }).join("\n");
  $('#birthDay').append(dates);

  // Birth hour & birth year branch: Ty - Suu - Dan - Mao - Thin - Ty - Ngo - Mui - Than - Dau - Tuat - Hoi
  var branchNames = Ziwei.Configs.Branches.Names;
  var branches = branchNames.mapKeyValues(function (branch, name) {
    return '<option value="' + branch + '">' + name + '</value>';
  }).join("\n");
  $('#birthHour').append(branches);
  $('#birthYearBranch').append(branches);

  // Birth month: Dan - Mao - Thin - Ty - Ngo - Mui - Than - Dau - Tuat - Hoi - Ty - Suu
  var lunarMonths = branchNames.allKeys().map(function (branch, index) {
    return '<option value="' + branch + '">' + branchNames[branch] + ' (' + (index + 1).limitInc(-2) + ')</value>';
  });

  var lunarMonths = $.merge(lunarMonths.slice(2, lunarMonths.length), lunarMonths.slice(0, 2)).join("\n");
  $('#birthMonth').append(lunarMonths);

  // Birth year stem: Giap - At - Binh - Dinh - Mau - Ky - Canh - Tan - Nham - Quy
  var stems = Ziwei.Configs.Stems.Names.mapKeyValues(function (stem, name) {
    return '<option value="' + stem + '">' + name + '</value>';
  }).join("\n");
  $('#birthYearStem').append(stems);
};

function setupCalcButtonHandler(calculator) {
  $('#calcButton').click(function () {
    var name = $('#profileName').val() || '<N/A>';
    var gender = $('#gender').val();
    var birthHour = $('#birthHour').val();
    var birthDay = parseInt($('#birthDay').val());
    var birthMonth = $('#birthMonth').val();
    var birthYearStem = $('#birthYearStem').val();
    var birthYearBranch = $('#birthYearBranch').val();
    var key = [gender, birthHour, birthDay, birthMonth, birthYearStem, birthYearBranch].join("_");

    var resultTable = calculator.calculateUserInputProfile({
      'key': key,
      'name': name,
      'gender': gender,
      'birthHour': birthHour,
      'birthDay': birthDay,
      'birthMonth': birthMonth,
      'birthYear': {
        'stem': birthYearStem,
        'branch': birthYearBranch
      }
    });
    console.log(gender);
    console.log(resultTable);

    Ziwei.Calculator.renderHtml(resultTable, $('#full-mode-button').hasClass('active'));
  });
};

function setupTestButtonHandler(calculator) {
  var profileOptions = calculator.profiles.mapKeyValues(function (key, profile) {
    return '<option value="' + key + '">' + profile.name + '</value>';
  }).join("\n");
  $('#presetProfile').append(profileOptions);

  $('#testButton').click(function () {
    var profileKey = $("#presetProfile").val();
    var resultTable = calculator.calculatePresetProfile(profileKey);
    Ziwei.Calculator.renderHtml(resultTable, $('#full-mode-button').hasClass('active'));
  });
};

function setupCheckersHandler(calculator) {
  var testModeButton = $('#test-mode-button');

  testModeButton.click(function () {
    testModeButton.toggleClass('active');
    var activeState = testModeButton.hasClass('active');
    testModeButton.text(activeState ? 'Nhập sẵn' : 'Nhập tay');
    $('#main-controls')[0].hidden = activeState;
    $('#test-controls')[0].hidden = !activeState;
  });

  var fullModeButton = $('#full-mode-button');

  if (checkMobileDevice()) {
    fullModeButton.removeClass('active');
    fullModeButton.text('Tên tắt');
  }

  fullModeButton.click(function () {
    if (calculator.currentProfile === undefined) {
      alert('Chưa lập số!');
      return;
    }

    fullModeButton.toggleClass('active');
    var activeState = fullModeButton.hasClass('active');
    fullModeButton.text(activeState ? 'Tên đủ' : 'Tên tắt');
    var resultTable = calculator.calculateCurrentProfile();
    Ziwei.Calculator.renderHtml(resultTable, activeState);
  });
};