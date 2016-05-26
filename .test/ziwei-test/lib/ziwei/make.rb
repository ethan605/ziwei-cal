from_dir = "#{Dir.pwd}"
to_dir = "#{Dir.pwd}/../../../.."
`cp -r #{from_dir} #{to_dir}/`

constant_file_content = %{
module Ziwei
  module Constants
    ROOT_DIR = "./"
  end
end
}

File.write("#{to_dir}/ziwei/constants.rb", constant_file_content)
`rm #{to_dir}/ziwei/make.rb`