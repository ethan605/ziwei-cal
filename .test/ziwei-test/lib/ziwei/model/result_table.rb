module Ziwei
  module Model
    class ResultTable
      class Palace
        attr_reader :position, :name
        attr_reader :is_body
        attr_reader :main_stars, :good_stars, :bad_stars
        attr_reader :trang_sinh_constellation
        attr_reader :opportunity_age

        def initialize(configs)
          @position = configs[:position] || configs["position"]
          @name = configs[:name] || configs["name"]
          @is_body = (configs[:is_body] || configs["is_body"]) == true
          @main_stars = configs[:main_stars] || configs["main_stars"]
          @good_stars = configs[:good_stars] || configs["good_stars"]
          @bad_stars = configs[:bad_stars] || configs["bad_stars"]
          @trang_sinh_constellation = configs[:trang_sinh_constellation] || configs["trang_sinh_constellation"]
          @opportunity_age = configs[:opportunity_age] || configs["opportunity_age"]
        end
      end

      attr_reader :palaces

      def initialize(palace_configs)
        @palaces = palace_configs.map {|position, config|
          Palace.new(config.merge({position: position}))
        }
      end
    end
  end
end