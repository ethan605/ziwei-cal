module Ziwei
  class Calculator
    include Utils::ReuseUtils
    include Utils::CalcCommons
    include Utils::CalcForteenMainStars

    def test
      # @profile = Profile.new(name: "Test", hour: :ty2, day: 22, month: :thin, year_stem: :tan, year_branch: :mui)
      @profile = Profile.new(name: "Test", gender: :female, hour: :dan, day: 28, month: :than, year_stem: :tan, year_branch: :mui)

      menh_position, than_position = calc_menh_than(@profile.b_hour, @profile.b_month)
      cuc_element, cuc_number = calc_cuc(menh_position, @profile.b_year_stem)
      forteen_main_stars = calc_forteen_main_stars(cuc_element, cuc_number, @profile.b_day)

      
    end
  end
end