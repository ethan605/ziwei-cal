module Ziwei
  module Utils
    module CalcCommons
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_menh_than(birth_hour, birth_month)
          hour_index = Constants::Branches::Indexes[birth_hour]
          month_index = Constants::Branches::Indexes[birth_month]

          menh_index = limit_dec(month_index, 12, hour_index-1)
          than_index = limit_inc(month_index, 12, hour_index-1)

          [
            Constants::Branches::Orders[menh_index],
            Constants::Branches::Orders[than_index]
          ]
        end

        def calc_cuc(menh_position, birth_year_stem)
          start_element = Constants::Wuxing::ElementsByBranches[menh_position]
          start_element_index = Constants::Wuxing::Elements.index(start_element)
          counting_steps = Constants::Stems::Indexes[birth_year_stem]
          cuc_index = limit_inc(start_element_index, 5, counting_steps, 0)

          cuc_element = Constants::Wuxing::Elements[cuc_index]
          cuc_number = Constants::Wuxing::CucByElements[cuc_element]

          [cuc_element, cuc_number]
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end