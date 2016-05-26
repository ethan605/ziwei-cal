module Ziwei
  module Models
    class ResultTable
      include Ziwei::Utils::ReuseUtils
      
      class Palace
        include Utils::ReuseUtils

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

        def full_names
          {
            position: full_name(@position, "Branches"),
            name: full_name(@name, "Palaces"),
            body: @is_body ? "Thân" : "",
            main_stars: @main_stars.map {|star|
              full_name(star, "ForteenMainStars") + " (#{Configs::ForteenMainStars::Places[star][@position]})"
            },
            good_stars: @good_stars.map {|star| full_name(star)},
            bad_stars: @bad_stars.map {|star| full_name(star)},
            trang_sinh_constellation: full_name(@trang_sinh_constellation, "TrangSinhConstellation"),
            opportunity_age: @opportunity_age
          }
        end

        def short_names
          {
            position: full_name(@position, "Branches"),
            name: short_name(@name, "Palaces"),
            body: @is_body ? "Thân" : "",
            main_stars: @main_stars.map {|star|
              short_name(star, "ForteenMainStars") + " (#{Configs::ForteenMainStars::Places[star][@position]})"
            },
            good_stars: @good_stars.map {|star| short_name(star)},
            bad_stars: @bad_stars.map {|star| short_name(star)},
            trang_sinh_constellation: short_name(@trang_sinh_constellation, "TrangSinhConstellation"),
            opportunity_age: @opportunity_age
          }
        end

        def render(use_full_names = true)
          template = File.read("#{Constants::ROOT_DIR}/view_templates/result_palace.erb")
          @configs = use_full_names ? full_names : short_names
          ERB.new(template).result(binding)
        end
      end

      attr_reader :profile
      attr_reader :palaces
      attr_reader :tuan_coordinate, :triet_coordinate
      attr_reader :connected_coordinates

      def initialize(args = {})
        @profile = args[:profile] || args["profile"]
        palace_configs = args[:palaces] || args["palaces"]
        @palaces = palace_configs.map {|position, config|
          Palace.new(config.merge({position: position}))
        }
        @tuan_coordinate = args[:tuan_coordinate] || configs["tuan_coordinate"]
        @triet_coordinate = args[:triet_coordinate] || configs["triet_coordinate"]
        @connected_coordinates = args[:connected_coordinates] || configs["connected_coordinates"]
      end

      def full_names
        Hash[@palaces.map {|palace|
          [palace.position, palace.full_names]
        }]
      end

      def short_names
        Hash[@palaces.map {|palace|
          [palace.position, palace.short_names]
        }]
      end

      def render(use_full_names = true)
        table_template = File.read("#{Constants::ROOT_DIR}/view_templates/result_table.erb")
        center_info_template = File.read("#{Constants::ROOT_DIR}/view_templates/center_info.erb")

        @rendered_palaces = {}
        @palaces.each {|palace|
          @rendered_palaces[palace.position] = palace.render(use_full_names)
        }

        center_info = ERB.new(center_info_template).result(binding)

        File.write(
          "#{Constants::ROOT_DIR}/results/html/#{@profile.key}#{use_full_names ? "" : "_short"}.html",
          ERB.new(table_template).result(binding)
        )
      end
    end
  end
end