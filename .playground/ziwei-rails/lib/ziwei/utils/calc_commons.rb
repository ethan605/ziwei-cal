module Ziwei
  module Utils
    module CalcCommons
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_self_body_position(birth_hour, birth_month)
          hour_index = Configs::Branches::Indexes[birth_hour]
          month_index = Configs::Branches::Indexes[birth_month]

          self_index = limit_inc(month_index, -hour_index+1)
          body_index = limit_inc(month_index, hour_index-1)

          [
            Configs::Branches::Orders[self_index],
            Configs::Branches::Orders[body_index]
          ]
        end

        def calc_palaces_positions(self_position)
          self_index = Configs::Branches::Indexes[self_position]
          
          branches = Configs::Branches::Names.keys
          palaces = Configs::Palaces::Orders

          merge_sequences_from_index(branches, palaces, self_index)
        end

        def calc_cuc(self_position, birth_year_stem)
          start_element = Configs::Wuxing::ElementsByBranches[self_position]
          start_element_index = Configs::Wuxing::Elements.index(start_element)
          counting_steps = Configs::Stems::Indexes[birth_year_stem]
          cuc_index = limit_inc(start_element_index, counting_steps, 5, 0)

          cuc_element = Configs::Wuxing::Elements[cuc_index]
          cuc_number = Configs::Wuxing::CucByElements[cuc_element]

          [cuc_element, cuc_number]
        end

        def calc_opportunity_ages(self_position, cuc_number, fate_direction)
          self_index = Configs::Branches::Indexes[self_position]

          branches = Configs::Branches::Names.keys
          ages = (0..11).map {|mult| cuc_number + 10*mult}

          merge_sequences_from_index(branches, ages, self_index, fate_direction == -1)
        end

        def calc_connected_palace_coordinates(self_position)
          self_index = Configs::Branches::Indexes[self_position]
          self_coordinate = Configs::Palaces::DrawingRootCoordinates[self_position]

          opposite_index = limit_inc(self_index, 6)
          opposite_position = Configs::Branches::Orders[opposite_index]
          opposite_coordinate = Configs::Palaces::DrawingRootCoordinates[opposite_position]

          trilogy_element = Configs::BranchSets::Trilogy::ByBranches[self_position]
          same_set_positions = Configs::BranchSets::Trilogy::ByElements[trilogy_element] - [self_position]
          same_set_coordinates = same_set_positions.map {|position|
            Configs::Palaces::DrawingRootCoordinates[position]
          }

          ([opposite_coordinate] + same_set_coordinates).map {|from_coordinate|
            [from_coordinate, self_coordinate]
          }
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