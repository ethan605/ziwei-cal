class _Ziwei_Models_ResultPalace {
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

  fullName() {
    return {
      position: this.position.getFullName('Branches'),
      name: this.name.getFullName('Palaces'),
      body: this.is_body ? 'Thân' : '',
      mainStars: this.mainStars.map(function(star) {
        var quality = Ziwei.Configs.ForteenMainStars.Places[star][this.position];
        return star.getFullName('ForteenMainStars') + ` (${quality})`;
      }),
      goodStars: this.goodStars.map((star) => star.getFullName()),
      badStars: this.badStars.map((star) => star.getFullName()),
      trangSinhConstellation: this.trangSinhConstellation.getFullName("TrangSinhConstellation"),
      opportunityAge: this.opportunityAge
    };
  }
}