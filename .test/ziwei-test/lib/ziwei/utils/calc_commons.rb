module Ziwei
  module Utils
    module CalcCommons
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_self_body_position(birth_hour, birth_month)
          hour_index = Constants::Branches::Indexes[birth_hour]
          month_index = Constants::Branches::Indexes[birth_month]

          self_index = limit_dec(month_index, 12, hour_index-1)
          body_index = limit_inc(month_index, 12, hour_index-1)

          [
            Constants::Branches::Orders[self_index],
            Constants::Branches::Orders[body_index]
          ]
        end

        def calc_palaces_positions(self_position)
          self_index = Constants::Branches::Indexes[self_position]
          palaces = Constants::Palaces::Orders.dup

          # re-arrange palaces in order of branches,
          # skip if self_index is 1 (identical order with branches)
          palaces = palaces[(12-self_index+1)..-1] + palaces[0..(12-self_index)] if self_index != 1

          Hash[[Constants::Branches::Names.keys, palaces].transpose]
        end

        def calc_cuc(self_position, birth_year_stem)
          start_element = Constants::Wuxing::ElementsByBranches[self_position]
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