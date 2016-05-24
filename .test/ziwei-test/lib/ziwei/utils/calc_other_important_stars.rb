module Ziwei
  module Utils
    module CalcOtherImportantStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_other_important_stars(birth_year_stem, birth_year_branch)
          loc_ton_position = calc_loc_ton_position(birth_year_stem)
          thien_ma_position = calc_thien_ma_position(birth_year_branch)

          {
            loc_ton_position => :loc_ton,
            thien_ma_position => :thien_ma
          }
        end

        def calc_loc_ton_position(birth_year_stem)
          possible_positions = {
            :giap => :dan,
            :at => :mao,
            :binh => :ty2,
            :dinh => :ngo,
            :mau => :ty2,
            :ky => :ngo,
            :canh => :than,
            :tan => :dau,
            :nham => :ty,
            :quy => :hoi
          }

          possible_positions[birth_year_stem]
        end

        def calc_thien_ma_position(birth_year_branch)
          trilogy_element = Configs::BranchSets::Trilogy::ByBranches[birth_year_branch]
          first_branch = Configs::BranchSets::Trilogy::ByElements[trilogy_element].first
          first_branch_index = Configs::Branches::Indexes[first_branch]
          reflect_branch_index = limit_inc(first_branch_index, 12, 6)

          Configs::Branches::Orders[reflect_branch_index]
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end