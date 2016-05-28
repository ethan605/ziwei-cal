module Ziwei
  module Utils
    module ReuseUtils
      module ClassMethods
      end
      
      module InstanceMethods
        def limit_inc(start, inc_step = 1, limit = 12, min_result = 1)
          (start + inc_step - 1) % limit + min_result
        end

        def reflect_index(original_index, reflect_through = 2)
          limit_inc(reflect_through, -original_index+reflect_through)
        end

        def full_name(symbol, parent_module = nil)
          get_name(symbol, parent_module)
        end

        def short_name(symbol, parent_module = nil)
          get_name(symbol, parent_module, "Short")
        end

        def get_name(symbol, parent_module = nil, prefix = "")
          return eval("Ziwei::Configs::#{parent_module}::#{prefix}Names[:#{symbol.to_s}]") if parent_module

          all_names = [
            :ThaiTueConstellation,
            :LocTonConstellation,
            :SixDeadlyStars,
            :SixLuckyStars,
            :OtherImportantStars
          ].map {|modul|
            eval("Ziwei::Configs::#{modul}::#{prefix}Names")
          }.inject(&:merge)

          all_names[symbol.to_sym]
        end

        def get_element_color_style(wuxing_element)
          color = Ziwei::Configs::Wuxing::ElementColors[wuxing_element]
          color ? "color: #{color};" : ""
        end

        def get_place_quality_color_style(star)
          color = Ziwei::Configs::Wuxing::PlaceQualityColors[star[/(?!\()(\w|Đ)(?=\))/]]
          color ? "color: #{color};" : ""
        end

        def convert_coordinate_to_abs_pos(x_coord, y_coord)
          {
            left: (8 + 284*x_coord - 142 - 25),
            top: (8 + 164*y_coord - 10)
          }
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end