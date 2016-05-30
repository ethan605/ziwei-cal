_Ziwei_Models_ResultTable = class {
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