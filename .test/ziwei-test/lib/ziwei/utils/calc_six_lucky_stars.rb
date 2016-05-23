module Ziwei
  module Utils
    module CalcSixLuckyStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_six_lucky_stars_positions(birth_month, birth_hour)
          ta_phu_position, huu_bat_position = calc_ta_huu_positions(birth_month)
          van_xuong_position, van_khuc_position = calc_xuong_khuc_positions(birth_hour)

          stars_positions = {}
          stars_positions[ta_phu_position] = :ta_phu
          stars_positions[huu_bat_position] = :huu_bat
          stars_positions[van_xuong_position] = :van_xuong
          stars_positions[van_khuc_position] = :van_khuc

          stars_positions
        end

        def calc_ta_huu_positions(birth_month)
          thin_index = Configs::Branches::Indexes[:thin]-2
          birth_month_index = Configs::Branches::Indexes[birth_month]

          ta_phu_index = limit_inc(thin_index, 12, birth_month_index-1)
          huu_bat_index = reflect_index(ta_phu_index)

          [
            Configs::Branches::Orders[ta_phu_index],
            Configs::Branches::Orders[huu_bat_index]
          ]
        end

        def calc_xuong_khuc_positions(birth_hour)
          thin_index = Configs::Branches::Indexes[:thin]
          birth_hour_index = Configs::Branches::Indexes[birth_hour]

          van_khuc_index = limit_inc(thin_index, 12, birth_hour_index-1)
          van_xuong_index = reflect_index(van_khuc_index)

          [
            Configs::Branches::Orders[van_xuong_index],
            Configs::Branches::Orders[van_khuc_index]
          ]
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end