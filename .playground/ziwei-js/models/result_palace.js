_Ziwei_Models_ResultPalace = class {
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

  getShortNames() {
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

  renderHtml(template, useFullNames = true) {
    var context = useFullNames ? this.getFullNames() : this.getShortNames();
    var palaceHtml = template(context);

    return palaceHtml;
  };
};