class _Ziwei_Models_ResultTable {
  constructor(args = {}) {
    this.profile = args['profile'];
    
    var palaceConfigs = args['palaces'];
    this.palaces = Object.keys(palaceConfigs).map((position) => {
      var config = palaceConfigs[position]
      var resultPalace = new Ziwei.Models.ResultPalace(Object.assign({'position': position}, config));
      return resultPalace;
    });
    
    this.tuanCoordinate = args['tuanCoordinate'];
    this.trietCoordinate = args['trietCoordinate'];
    this.connectedCoordinates = args['connectedCoordinates'];
  }
}