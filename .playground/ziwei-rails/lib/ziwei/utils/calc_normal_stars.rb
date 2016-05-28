module Ziwei
  module Utils
    module CalcNormalStars
      module ClassMethods
      end
      
      module InstanceMethods
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
          hoa_cai_position = Configs::BranchSets::Trilogy::ByElements[trilogy_element].first

          hoa_cai_position
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end