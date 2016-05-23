module Ziwei
  module Utils
    module CalcSixDeadlyStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_khong_kiep_positions(birth_hour)
          hoi_index = Constants::Branches::Indexes[:hoi]
          birth_hour_index = Constants::Branches::Indexes[birth_hour]

          dia_khong_index = limit_dec(hoi_index, 12, birth_hour_index-1)
          dia_kiep_index = limit_inc(hoi_index, 12, birth_hour_index-1)

          [
            Constants::Branches::Orders[dia_khong_index],
            Constants::Branches::Orders[dia_kiep_index]
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