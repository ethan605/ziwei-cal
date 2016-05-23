module Ziwei
  module Utils
    module CalcSequentialConstellations
      module ClassMethods        
      end
      
      module InstanceMethods
        def calc_thai_tue_constellation_positions(birth_year_branch)
          thai_tue_index = Configs::Branches::Indexes[birth_year_branch]

          branches = Configs::Branches::Names.keys
          stars = Configs::ThaiTueConstellation::Orders

          merge_sequences_from_index(branches, stars, thai_tue_index)
        end

        def calc_trang_sinh_constellation_positions(cuc_number, fate_direction)
          possible_positions = [:than, :hoi, :ty2, :than, :dan]
          trang_sinh_position = possible_positions[cuc_number-2]
          trang_sinh_index = Configs::Branches::Indexes[trang_sinh_position]

          branches = Configs::Branches::Names.keys
          stars = Configs::TrangSinhConstellation::Orders.dup

          merge_sequences_from_index(branches, stars, trang_sinh_index, fate_direction == -1)
        end

        def calc_loc_ton_constellation_positions(loc_ton_position, fate_direction)
          loc_ton_index = Configs::Branches::Indexes[loc_ton_position]

          branches = Configs::Branches::Names.keys
          stars = Configs::LocTonConstellation::Orders

          merge_sequences_from_index(branches, stars, loc_ton_index, fate_direction == -1)
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end