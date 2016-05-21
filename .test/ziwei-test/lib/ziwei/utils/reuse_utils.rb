module Ziwei
  module Utils
    module ReuseUtils
      module ClassMethods
      end
      
      module InstanceMethods
        def limit_inc(start, limit = 12, inc_step = 1, min_result = 1)
          (start + inc_step - 1) % limit + min_result
        end

        def limit_dec(start, limit = 12, dec_step = 1, min_result = 1)
          (start - dec_step - 1) % limit + min_result
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end