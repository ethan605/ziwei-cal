class String
  def underscore
    self.gsub(/::/, '/').
    gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
    gsub(/([a-z\d])([A-Z])/,'\1_\2').
    tr("-", "_").
    downcase
  end
end

module Constants
  PADDING_CHAR = "\n"
  OUTPUT_FILE_NAME = "ziwei.joined.js"
end

config_modules = %w[BranchSets Branches ForteenMainStars FourTransformationStars Genders LocTonConstellation NormalStars OtherImportantStars Palaces SixDeadlyStars SixLuckyStars Stems ThaiTueConstellation TrangSinhConstellation TuanTriet Wuxing]
model_modules = %w[GanZhi Profile ResultPalace ResultTable]
calculator_files = %w[calc_commons calc_forteen_main_stars calc_four_transformation_stars calc_normal_stars calc_other_important_stars calc_sequential_constellations calc_six_deadly_stars calc_six_lucky_stars calc_tuan_triet reuse_utils]

ziwei_modules = {
  "Configs" => config_modules,
  "Models" => model_modules
}

extensions = File.read("extensions.js")

modules_hash = ziwei_modules.map {|parent_module, child_modules|
  parent_dir = parent_module.underscore

  child_modules.map {|child_module|
    child_file = child_module.underscore
    "var " + File.read("#{parent_dir}/#{child_file}.js")
  }
}

calculator = "var " + File.read("models/calculator.js")
calculator_utils = calculator_files.map {|file_name|
  File.read("utils/#{file_name}.js")
}

ziwei_hash = ziwei_modules.map {|parent_module, child_modules|
  child_hash = child_modules.map {|module_name|
    "\t"*2 + module_name + ": _Ziwei_#{parent_module}_" + module_name
  }.join(",#{Constants::PADDING_CHAR}")
  "\t" + parent_module + ": {#{Constants::PADDING_CHAR}" + child_hash + "#{Constants::PADDING_CHAR}\t}"
} + ["\tCalculator: _Ziwei_Calculator"]

ziwei_file = %{
var Ziwei = (function () {
#{extensions}
#{modules_hash.join("#{Constants::PADDING_CHAR}")}
#{calculator}
#{calculator_utils.join("#{Constants::PADDING_CHAR}")}
return {
#{ziwei_hash.join(",#{Constants::PADDING_CHAR}")}
};
}(Ziwei));}

File.write(Constants::OUTPUT_FILE_NAME, ziwei_file)