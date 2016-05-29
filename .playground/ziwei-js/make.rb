class String
  def underscore
    self.gsub(/::/, '/').
    gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
    gsub(/([a-z\d])([A-Z])/,'\1_\2').
    tr("-", "_").
    downcase
  end
end

PADDING_CHAR = "\n"

config_modules = %w[BranchSets Branches ForteenMainStars FourTransformationStars Genders LocTonConstellation NormalStars OtherImportantStars Palaces SixDeadlyStars SixLuckyStars Stems ThaiTueConstellation TrangSinhConstellation TuanTriet Wuxing]
model_modules = %w[GanZhi Profile ResultPalace ResultTable]

ziwei_modules = {
  "Configs" => config_modules,
  "Models" => model_modules
}

vars_hash = ziwei_modules.map {|parent_module, child_modules|
  parent_dir = parent_module.underscore

  child_modules.map {|child_module|
    child_file = child_module.underscore
    "var " + File.read("#{parent_dir}/#{child_file}.js")
  }
}

ziwei_hash = ziwei_modules.map {|parent_module, child_modules|
  child_hash = child_modules.map {|module_name|
    module_name + ": _Ziwei_#{parent_module}_" + module_name
  }.join(",#{PADDING_CHAR}")
  parent_module + ": {#{PADDING_CHAR}" + child_hash + "#{PADDING_CHAR}}"
} + ["Calculator: _Ziwei_Calculator"]

ziwei_file = %{var Ziwei = (function () {
  #{vars_hash.join("#{PADDING_CHAR}")}
  return {
    #{ziwei_hash.join(",#{PADDING_CHAR}")}
  };
}(Ziwei));}

File.write("ziwei.joined.js", ziwei_file)