module Ziwei
  module Utils
    module CalcFourTransformationStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_four_transformation_stars(birth_year_stem, forteen_main_stars, six_lucky_stars)
          positions_by_stems = {
            :giap => [:liem_trinh, :thien_phu, :vu_khuc, :thai_duong],
            :at => [:thien_co, :thien_luong, :tu_vi, :thai_am],
            :binh => [:thien_dong, :thien_co, :van_xuong, :liem_trinh],
            :dinh => [:thai_am, :thien_dong, :thien_co, :cu_mon],
            :mau => [:tham_lang, :thai_am, :huu_bat, :thien_co],
            :ky => [:vu_khuc, :tham_lang, :thien_luong, :van_khuc],
            :canh => [:thai_duong, :vu_khuc, :thai_am, :thien_dong],
            :tan => [:cu_mon, :thai_duong, :van_khuc, :van_xuong],
            :nham => [:thien_luong, :tu_vi, :thien_phu, :vu_khuc],
            :quy => [:pha_quan, :cu_mon, :thai_am, :tham_lang]
          };

          transformed_stars = positions_by_stems[birth_year_stem]

          four_transformation_positions = transformed_stars.map {|transformed_star|
            main_stars = forteen_main_stars.find {|position, stars|
              stars.include?(transformed_star)
            }

            other_stars = six_lucky_stars.find {|position, stars|
              stars.include?(transformed_star)
            }

            (main_stars || other_stars).first
          }

          stars_positions = {}

          [
            four_transformation_positions,
            [:hoa_loc, :hoa_quyen, :hoa_khoa, :hoa_ky]
          ].transpose.each {|position, star|
            stars_positions[position] ||= []
            stars_positions[position] << star
          }

          stars_positions
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end