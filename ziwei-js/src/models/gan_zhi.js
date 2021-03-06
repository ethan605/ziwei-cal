_Ziwei_Models_GanZhi = class {
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