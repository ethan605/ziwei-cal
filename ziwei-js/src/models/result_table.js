_Ziwei_Models_ResultTable = class {
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
};