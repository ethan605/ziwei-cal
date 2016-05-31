_Ziwei_Models_Profile = class {
  constructor(args = {}) {
    this.key = args['key'] || "keyname";
    this.name = args['name'] || "<N/A>";

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
};