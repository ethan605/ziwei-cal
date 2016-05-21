module Ziwei
  class Calculator
    include Utils::ReuseUtils
    include Utils::CalcCommons

    def test
      # @profile = Profile.new(name: "Test", hour: :ty2, day: 22, month: :thin, year_stem: :tan, year_branch: :mui)
      @profile = Profile.new(name: "Test", gender: :female, hour: :dan, day: 28, month: :than, year_stem: :tan, year_branch: :mui)
      menh_position = calc_menh
      than_position = calc_than

      cuc_element, cuc_number = calc_cuc(menh_position)
    end
  end
end