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

        def reflect_index(original_index, reflect_through = 2)
          limit_dec(reflect_through, 12, original_index-reflect_through)
        end

        def full_name(symbol, parent_module = nil)
          get_name(symbol, parent_module)
        end

        def short_name(symbol, parent_module = nil)
          get_name(symbol, parent_module, "Short")
        end

        def get_name(symbol, parent_module = nil, prefix = "")
          return eval("Ziwei::Configs::#{parent_module}::#{prefix}Names[:#{symbol.to_s}]") if parent_module

          all_names = [
            :ThaiTueConstellation,
            :LocTonConstellation,
            :SixDeadlyStars,
            :SixLuckyStars,
            :OtherImportantStars
          ].map {|modul|
            eval("Ziwei::Configs::#{modul}::#{prefix}Names")
          }.inject(&:merge)

          all_names[symbol.to_sym]
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end