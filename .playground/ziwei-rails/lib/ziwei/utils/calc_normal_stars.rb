module Ziwei
  module Utils
    module CalcNormalStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_normal_stars(birth_month, birth_year_branch)
          thien_hinh_position, thien_dieu_position, thien_y_position = calc_hinh_dieu_y_positions(birth_month)
          hoa_cai_position = calc_hoa_cai_position(birth_year_branch)
          am_sat_position = calc_am_sat_position(birth_month)
          co_than_position, qua_tu_position = calc_co_qua_positions(birth_year_branch)
          thien_khoc_position, thien_hu_position = calc_khoc_hu_positions(birth_year_branch)

          stars_positions = {}

          [
            [thien_hinh_position, :thien_hinh],
            [thien_dieu_position, :thien_dieu],
            [thien_y_position, :thien_y],
            [hoa_cai_position, :hoa_cai],
            [am_sat_position, :am_sat],
            [co_than_position, :co_than],
            [qua_tu_position, :qua_tu],
            [thien_khoc_position, :thien_khoc],
            [thien_hu_position, :thien_hu]
          ].each {|position, star|
            stars_positions[position] ||= []
            stars_positions[position] << star
          }

          stars_positions
        end

        def calc_hinh_dieu_y_positions(birth_month)
          birth_month_number = Configs::Branches::Indexes[birth_month] - 2
  
          dau_index = Configs::Branches::Indexes[:dau]
          thien_hinh_index = limit_inc(dau_index, birth_month_number-1)

          suu_index = Configs::Branches::Indexes[:suu]
          thien_dieu_index = limit_inc(suu_index, birth_month_number-1)
          thien_y_index = thien_dieu_index

          [
            Configs::Branches::Orders[thien_hinh_index],
            Configs::Branches::Orders[thien_dieu_index],
            Configs::Branches::Orders[thien_y_index]
          ]
        end

        def calc_hoa_cai_position(birth_year_branch)
          trilogy_element = Configs::BranchSets::Trilogy::ByBranches[birth_year_branch]
          hoa_cai_position = Configs::BranchSets::Trilogy::ByElements[trilogy_element][1]

          hoa_cai_position
        end

        def calc_am_sat_position(birth_month)
          # By month:           6,12   1,7  2,8   3,9    4,10  5,11
          possible_positions = [:thin, :dan, :ty, :tuat, :than, :ngo]
          birth_month_number = Configs::Branches::Indexes[birth_month] - 2
          am_sat_position = possible_positions[birth_month_number % 6]

          return am_sat_position;
        end

        def calc_co_qua_positions(birth_year_branch)
          birth_year_index = Configs::Branches::Indexes[birth_year_branch]
          branch_set_order = (limit_inc(birth_year_index) - 1) / 3
          branch_set = Configs::BranchSets::Trilogy::ByRelatives[branch_set_order]
          branch_set_indexes = branch_set.map {|branch| Configs::Branches::Indexes[branch]}

          co_than_index = limit_inc(branch_set_indexes.first, -1)
          qua_tu_index = limit_inc(branch_set_indexes.last)

          [
            Configs::Branches::Orders[co_than_index],
            Configs::Branches::Orders[qua_tu_index]
          ]
        end

        def calc_khoc_hu_positions(birth_year_branch)
          ngo_index = Configs::Branches::Indexes[:ngo]
          birth_year_index = Configs::Branches::Indexes[birth_year_branch]

          thien_khoc_index = limit_inc(ngo_index, -birth_year_index+1)
          thien_hu_index = limit_inc(ngo_index, birth_year_index-1)

          [
            Configs::Branches::Orders[thien_khoc_index],
            Configs::Branches::Orders[thien_hu_index]
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