var Ziwei = (function () {
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
    'de_vuong': 'Đế',
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
}
var _Ziwei_Models_ResultPalace = class {
  constructor(configs = {}) {
    this.position = configs['position'];
    this.name = configs['name'];
    this.isBody = configs['isBody'];
    this.mainStars = configs['mainStars'];
    this.goodStars = configs['goodStars'];
    this.badStars = configs['badStars'];
    this.trangSinhConstellation = configs['trangSinhConstellation'];
    this.opportunityAge = configs['opportunityAge'];
  };

  getFullNames() {
    var _self = this;

    return {
      position: _self.position.getFullName('Branches'),
      name: _self.name.getFullName('Palaces'),
      body: _self.is_body ? 'Thân' : '',
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

  getShortName() {
    var _self = this;

    return {
      position: _self.position.getFullName('Branches'),
      name: _self.name.getShortName('Palaces'),
      body: _self.is_body ? 'Thân' : '',
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
}
var _Ziwei_Models_ResultTable = class {
  constructor(args = {}) {
    this.profile = args['profile'];
    
    var palaceConfigs = args['palaces'];
    this.palaces = palaceConfigs.map((position, config) => {
      return new Ziwei.Models.ResultPalace(Object.assign({'position': position}, config));
    });
    
    this.tuanCoordinate = args['tuanCoordinate'];
    this.trietCoordinate = args['trietCoordinate'];
    this.connectedCoordinates = args['connectedCoordinates'];
  }
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