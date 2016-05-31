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
  ES6_FILE_NAME = "ziwei.es6.js"
  ES5_FILE_NAME = "ziwei.es5.js"
  MINIFIED_FILE_NAME = "ziwei.min.js"
end

def join_js_files
  config_modules = %w[BranchSets Branches ForteenMainStars FourTransformationStars Genders LocTonConstellation NormalStars OtherImportantStars Palaces SixDeadlyStars SixLuckyStars Stems ThaiTueConstellation TrangSinhConstellation TuanTriet Wuxing]
  model_modules = %w[GanZhi Profile ResultPalace ResultTable]
  calculator_files = %w[calc_commons calc_forteen_main_stars calc_four_transformation_stars calc_normal_stars calc_other_important_stars calc_sequential_constellations calc_six_deadly_stars calc_six_lucky_stars calc_tuan_triet reuse_utils views_generator]

  ziwei_modules = {
    "Configs" => config_modules,
    "Models" => model_modules
  }

  extensions = File.read("utils/extensions.js")

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
  
  File.write(Constants::ES6_FILE_NAME, ziwei_file)
end

def convert_and_minify
  es5_code = Babel::Transpiler.transform(File.read(Constants::ES6_FILE_NAME))
  File.write(Constants::ES5_FILE_NAME, es5_code["code"])
  File.write(Constants::MINIFIED_FILE_NAME, Uglifier.compile(File.read(Constants::ES5_FILE_NAME)))
end

def clean_up_and_make_copy
  dst_dir = "../.."
  `rm -rf #{dst_dir}/ziwei-js`
  FileUtils::mkdir_p("#{dst_dir}/ziwei-js")
  `cp #{Constants::MINIFIED_FILE_NAME} #{dst_dir}/ziwei-js/`

  `mv #{Constants::ES6_FILE_NAME} #{Constants::ES5_FILE_NAME} vendors`
  `mv #{Constants::MINIFIED_FILE_NAME} vendors`

  FileUtils::mkdir_p("#{dst_dir}/ziwei-js/src")
  `cp ziwei.js #{dst_dir}/ziwei-js/src/`
  %w[configs models utils].each {|dir| `cp -r #{dir} #{dst_dir}/ziwei-js/src/`}
end

join_js_files
convert_and_minify
clean_up_and_make_copy

# calc = new Ziwei.Calculator();
# rt = calc.calculateProfile();
# p = rt.palaces.find((p) => p.position === 'than');
# p.getFullNames();
# p.getShortNames();