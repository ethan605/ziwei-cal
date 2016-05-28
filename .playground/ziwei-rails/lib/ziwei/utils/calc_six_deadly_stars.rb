module Ziwei
  module Utils
    module CalcSixDeadlyStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_six_deadly_stars_positions(birth_hour, loc_ton_position, birth_year_branch)
          dia_khong_position, dia_kiep_position = calc_khong_kiep_positions(birth_hour)
          kinh_duong_position, da_la_position = calc_kinh_da_positions(loc_ton_position)
          hoa_tinh_position, linh_tinh_position = calc_hoa_linh_positions(birth_year_branch, birth_hour)

          stars_positions = {}

          [
            [dia_khong_position, :dia_khong],
            [dia_kiep_position, :dia_kiep],
            [kinh_duong_position, :kinh_duong],
            [da_la_position, :da_la],
            [hoa_tinh_position, :hoa_tinh],
            [linh_tinh_position, :linh_tinh]
          ].each {|position, star|
            stars_positions[position] ||= []
            stars_positions[position] << star
          }

          stars_positions
        end

        def calc_khong_kiep_positions(birth_hour)
          hoi_index = Configs::Branches::Indexes[:hoi]
          birth_hour_index = Configs::Branches::Indexes[birth_hour]

          dia_khong_index = limit_inc(hoi_index, -birth_hour_index+1)
          dia_kiep_index = limit_inc(hoi_index, birth_hour_index-1)

          [
            Configs::Branches::Orders[dia_khong_index],
            Configs::Branches::Orders[dia_kiep_index]
          ]
        end

        def calc_kinh_da_positions(loc_ton_position)
          loc_ton_index = Configs::Branches::Indexes[loc_ton_position]

          kinh_duong_index = limit_inc(loc_ton_index)
          da_la_index = limit_inc(loc_ton_index, -1)

          [
            Configs::Branches::Orders[kinh_duong_index],
            Configs::Branches::Orders[da_la_index]
          ]
        end

        def calc_hoa_linh_positions(birth_year_branch, birth_hour)
          start_positions = {
            hoa: [:suu, :mao],
            thuy: [:dau, :tuat],
            moc: [:dan, :tuat],
            kim: [:mao, :tuat]
          };

          birth_hour_index = Configs::Branches::Indexes[birth_hour]
          trilogy_element = Configs::BranchSets::Trilogy::ByBranches[birth_year_branch]
          
          hoa_tinh_start_pos, linh_tinh_start_pos = start_positions[trilogy_element]
          hoa_tinh_start_index = Configs::Branches::Indexes[hoa_tinh_start_pos]
          linh_tinh_start_index = Configs::Branches::Indexes[linh_tinh_start_pos]

          hoa_tinh_index = limit_inc(hoa_tinh_start_index, birth_hour_index-1)
          linh_tinh_index = limit_inc(linh_tinh_start_index, -birth_hour_index+1)

          [
            Configs::Branches::Orders[hoa_tinh_index],
            Configs::Branches::Orders[linh_tinh_index]
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