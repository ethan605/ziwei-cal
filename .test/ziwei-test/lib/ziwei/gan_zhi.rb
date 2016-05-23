module Ziwei
  class GanZhi
    attr_reader :stem, :branch

    def initialize(args = {})
      @stem = args[:stem] || args["stem"] || :giap
      @stem = :giap if @stem == :_

      @branch = args[:branch] || args["branch"] || :ty
      @branch = :ty if @branch == :_

      stem_index = Constants::Stems::Orders.index(@stem)
      branch_index = Constants::Branches::Orders.index(@branch)

      raise "Invalid stem-branch pair" if (stem_index.odd? ^ branch_index.odd?)
    end

    def inspect
      [
        Constants::Stems::Names[@stem],
        Constants::Branches::Names[@branch]
      ].join(" ")
    end
  end
end