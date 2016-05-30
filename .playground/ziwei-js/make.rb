require 'fileutils'
require 'uglifier'
require 'babel/transpiler'

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
  PADDING = "\s"*2
  JOIN_CHAR = "\n"
  JOINED_FILE_NAME = "ziwei.joined.js"
  ES5_FILE_NAME = "ziwei.es5.js"
  MINIFIED_FILE_NAME = "ziwei.min.js"
end

def join_ziwei_files
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
      Constants::PADDING*2 + module_name + ": _Ziwei_#{parent_module}_" + module_name
    }.join(",#{Constants::JOIN_CHAR}")
    Constants::PADDING + parent_module + ": {#{Constants::JOIN_CHAR}" + child_hash + "#{Constants::JOIN_CHAR}#{Constants::PADDING}}"
  } + ["#{Constants::PADDING}Calculator: _Ziwei_Calculator"]

  ziwei_file = %{
  var Ziwei = (function () {
  #{extensions}
  #{modules_hash.join("#{Constants::JOIN_CHAR}")}
  #{calculator}
  #{calculator_utils.join("#{Constants::JOIN_CHAR}")}
  return {
  #{ziwei_hash.join(",#{Constants::JOIN_CHAR}")}
  };
  }(Ziwei));}

  # ziwei_file = %{
  # var Ziwei = (function () {
  # #{extensions}
  # #{modules_hash.join("#{Constants::JOIN_CHAR}")}
  # #{calculator}
  # #{calculator_utils.join("#{Constants::JOIN_CHAR}")}
  # return {
  #   Configs: {
  #     BranchSets: _Ziwei_Configs_BranchSets,
  #     Branches: _Ziwei_Configs_Branches,
  #     ForteenMainStars: _Ziwei_Configs_ForteenMainStars,
  #     FourTransformationStars: _Ziwei_Configs_FourTransformationStars,
  #     Genders: _Ziwei_Configs_Genders,
  #     LocTonConstellation: _Ziwei_Configs_LocTonConstellation,
  #     NormalStars: _Ziwei_Configs_NormalStars,
  #     OtherImportantStars: _Ziwei_Configs_OtherImportantStars,
  #     Palaces: _Ziwei_Configs_Palaces,
  #     SixDeadlyStars: _Ziwei_Configs_SixDeadlyStars,
  #     SixLuckyStars: _Ziwei_Configs_SixLuckyStars,
  #     Stems: _Ziwei_Configs_Stems,
  #     ThaiTueConstellation: _Ziwei_Configs_ThaiTueConstellation,
  #     TrangSinhConstellation: _Ziwei_Configs_TrangSinhConstellation,
  #     TuanTriet: _Ziwei_Configs_TuanTriet,
  #     Wuxing: _Ziwei_Configs_Wuxing
  #   },
  #   Models: {
  #     GanZhi: _Ziwei_Models_GanZhi,
  #     Profile: _Ziwei_Models_Profile,
  #     ResultPalace: _Ziwei_Models_ResultPalace,
  #     ResultTable: _Ziwei_Models_ResultTable
  #   },
  #   Calculator: _Ziwei_Calculator
  # };
  # }(Ziwei));}
  
  File.write(Constants::JOINED_FILE_NAME, ziwei_file)
end

def uglify_joined_file
  converted_es5_code = Babel::Transpiler.transform(File.read(Constants::JOINED_FILE_NAME))
  File.write(Constants::ES5_FILE_NAME, converted_es5_code["code"])
  File.write(Constants::MINIFIED_FILE_NAME, Uglifier.compile(File.read(Constants::ES5_FILE_NAME)))
end

def clean_up_and_make_copy
  # `rm #{Constants::JOINED_FILE_NAME} #{Constants::ES5_FILE_NAME}`
  dst_dir = "../.."
  `rm -rf #{dst_dir}/ziwei-js`
  FileUtils::mkdir_p("#{dst_dir}/ziwei-js")
  `cp #{Constants::MINIFIED_FILE_NAME} #{dst_dir}/ziwei-js`
end

join_ziwei_files
uglify_joined_file
clean_up_and_make_copy

# calc = new Ziwei.Calculator();
# rt = calc.calculateProfile();
# p = rt.palaces.find((p) => p.position === 'than');
# p.getFullNames();
# p.getShortNames();