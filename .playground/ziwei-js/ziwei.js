var Ziwei = (function () {
  return {
    Configs: {
      BranchSets: _Ziwei_Configs_Branch_Sets,
      Branches: _Ziwei_Configs_Branches,
      ForteenMainStars: _Ziwei_Configs_ForteenMainStars,
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
      Profile: _Ziwei_Models_Profile
    },
    Calculator: _Ziwei_Calculator
  }
}(Ziwei));

Ziwei.test = function test() {
  calc = new Ziwei.Calculator();
  return calc.calculateProfile();
};