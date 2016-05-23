module Ziwei
  module Utils
    module CalcThaiTueConstellation
      module ClassMethods
        
      end
      
      module InstanceMethods
        def calc_thai_tue_constellation_positions(birth_year_branch)
          thai_tue_index = Constants::Branches::Indexes[birth_year_branch]
          stars = Constants::ThaiTueConstellation::Orders.dup

          # re-arrange stars in order of branches,
          # skip if thai_tue_index is 1 (identical order with branches)
          stars = stars[(12-thai_tue_index+1)..-1] + stars[0..(12-thai_tue_index)] if thai_tue_index != 1

          Hash[[Constants::Branches::Names.keys, stars].transpose]
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end