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
            main_stars: @main_stars.map {|star| full_name(star, "ForteenMainStars") + " (#{Configs::ForteenMainStars::Places[star][@position]})"},
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
            main_stars: @main_stars.map {|star| short_name(star, "ForteenMainStars")},
            good_stars: @good_stars.map {|star| short_name(star)},
            bad_stars: @bad_stars.map {|star| short_name(star)},
            trang_sinh_constellation: short_name(@trang_sinh_constellation, "TrangSinhConstellation"),
            opportunity_age: @opportunity_age
          }
        end

        def render(use_full_names = true)
          template = File.read("#{Rails.root}/lib/ziwei/view_templates/result_palace.erb")
          @configs = use_full_names ? full_names : short_names
          ERB.new(template).result(binding)
        end
      end

      attr_reader :profile
      attr_reader :palaces

      def initialize(profile, palace_configs)
        @profile = profile
        @palaces = palace_configs.map {|position, config|
          Palace.new(config.merge({position: position}))
        }
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
        template = File.read("#{Rails.root}/lib/ziwei/view_templates/result_table.erb")
        @rendered_palaces = {}
        @palaces.each {|palace|
          @rendered_palaces[palace.position] = palace.render(use_full_names)
        }

        File.write(
          "#{Rails.root}/lib/ziwei/results/html/#{@profile.key}#{use_full_names ? "" : "_short"}.html",
          ERB.new(template).result(binding)
        )
      end
    end
  end
end