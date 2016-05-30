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