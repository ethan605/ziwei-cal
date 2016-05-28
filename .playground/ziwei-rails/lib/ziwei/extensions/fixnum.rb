module Ziwei
  module Extensions
    module Fixnum
      def limit_inc(inc_step = 1, limit = 12, min_result = 1)
        (self + inc_step - 1) % limit + min_result
      end

      def reflect_index(reflect_through = 2)
        reflect_through.limit_inc(-self+reflect_through)
      end
    end
  end
end