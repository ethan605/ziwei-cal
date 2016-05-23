module Ziwei
  module Configs
    module Genders
      Names = {
        :male => "Nam",
        :female => "Nữ"
      }

      Converts = {
        "Nam" => :male,
        "Nữ" => :female
      }

      Directions = {
        :male => 1,
        :female => -1
      }
    end
  end
end