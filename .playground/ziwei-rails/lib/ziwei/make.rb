from_dir = "#{Dir.pwd}"
to_dir = "#{Dir.pwd}/../../../.."
dir_name = "ziwei-ruby"
`rm -rf #{to_dir}/#{dir_name}`
`cp -r #{from_dir} #{to_dir}/#{dir_name}`

constant_file_content = %{
module Ziwei
  module Constants
    ROOT_DIR = "."
  end
end
}

File.write("#{to_dir}/#{dir_name}/constants.rb", constant_file_content)
`rm #{to_dir}/#{dir_name}/make.rb`