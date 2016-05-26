module Ziwei
  module Utils
    module CalcTuanTriet
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_tuan_coordinate
          # x_coord, y_coord
          [1, 1]
        end

        def calc_triet_coordinate
          # x_coord, y_coord
          [4, 3]
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end