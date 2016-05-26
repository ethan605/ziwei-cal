module Ziwei
  module Models
    class GanZhi
      attr_reader :stem, :branch

      def initialize(args = {})
        @stem = args[:stem] || args["stem"] || :giap
        @stem = :giap if @stem == :_

        @branch = args[:branch] || args["branch"] || :ty
        @branch = :ty if @branch == :_

        stem_index = Configs::Stems::Orders.index(@stem)
        branch_index = Configs::Branches::Orders.index(@branch)

        raise "Invalid stem-branch pair" if (stem_index.odd? ^ branch_index.odd?)
      end

      def inspect
        [
          Configs::Stems::Names[@stem],
          Configs::Branches::Names[@branch]
        ].join(" ")
      end
    end
  end
end