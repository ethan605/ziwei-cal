module Ziwei
  class GanZhi
    attr_reader :stem, :branch

    def stem=(new_stem)
      raise "Invalid stem" if (!Constants::Stems::Orders.include?(new_stem) || new_stem == :_)
      @stem = new_stem
    end

    def branch=(new_branch)
      raise "Invalid branch" if (!Constants::Branches::Orders.include?(new_branch) || new_branch == :_)
      @branch = new_branch
    end
  end
end