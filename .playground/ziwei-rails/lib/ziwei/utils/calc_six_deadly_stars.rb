module Ziwei
  module Utils
    module CalcSixDeadlyStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_six_deadly_stars_positions(birth_hour, loc_ton_position)
          dia_khong_position, dia_kiep_position = calc_khong_kiep_positions(birth_hour)
          kinh_duong_position, da_la_position = calc_kinh_da_positions(loc_ton_position)

          stars_positions = {}

          [
            [dia_khong_position, :dia_khong],
            [dia_kiep_position, :dia_kiep],
            [kinh_duong_position, :kinh_duong],
            [da_la_position, :da_la]
          ].each {|position, star|
            stars_positions[position] ||= []
            stars_positions[position] << star
          }

          stars_positions
        end

        def calc_khong_kiep_positions(birth_hour)
          hoi_index = Configs::Branches::Indexes[:hoi]
          birth_hour_index = Configs::Branches::Indexes[birth_hour]

          dia_khong_index = limit_dec(hoi_index, 12, birth_hour_index-1)
          dia_kiep_index = limit_inc(hoi_index, 12, birth_hour_index-1)

          [
            Configs::Branches::Orders[dia_khong_index],
            Configs::Branches::Orders[dia_kiep_index]
          ]
        end

        def calc_kinh_da_positions(loc_ton_position)
          loc_ton_index = Configs::Branches::Indexes[loc_ton_position]

          kinh_duong_index = limit_inc(loc_ton_index)
          da_la_index = limit_dec(loc_ton_index)

          [
            Configs::Branches::Orders[kinh_duong_index],
            Configs::Branches::Orders[da_la_index]
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