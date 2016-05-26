_Ziwei_Utils_ReuseUtils = {
  limit_inc: function(start, limit = 12, inc_step = 1, min_result = 1) {
    return (start + inc_step - 1) % limit + min_result;
  }
}

class _Ziwei_Test {
  test() {
    return limit_inc(1);
  }
}

var Ziwei = (function () {
  return {
    Configs: {
      BranchSets: _Ziwei_Configs_Branch_Sets,
      Branches: _Ziwei_Configs_Branches,
      ForteenMainStars: _Ziwei_Configs_ForteenMainStars,
      Genders: _Ziwei_Configs_Genders,
      LocTonConstellation: _Ziwei_Configs_LocTonConstellation,
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
      GanZhi: _Ziwei_Models_GanZhi
    },
    Utils: {
      ReuseUtils: _Ziwei_Utils_ReuseUtils
    },
    Test: _Ziwei_Test
  }
}(Ziwei));