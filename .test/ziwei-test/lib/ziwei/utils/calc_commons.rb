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
          
          branches = Constants::Branches::Names.keys
          palaces = Constants::Palaces::Orders

          merge_sequences_from_index(branches, palaces, self_index)
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

        def merge_sequences_from_index(first_sequence, second_sequence, merge_index, reversed_order = false)
          second_seq = second_sequence.dup

          # re-arrange second sequence in order of first one,
          # skip if merge_index is 1 (2 sequences have identical order)
          if merge_index != 1
            second_seq = unless reversed_order
              second_seq[(12-merge_index+1)..-1] + second_seq[0..(12-merge_index)]
            else
              second_seq[0..merge_index-1].reverse + second_seq[merge_index..-1].reverse
            end
          end

          Hash[[first_sequence, second_seq].transpose]
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end