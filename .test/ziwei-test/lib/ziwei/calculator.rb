module Ziwei
  class Calculator
    include Utils::ReuseUtils
    include Utils::CalcCommons
    include Utils::CalcForteenMainStars

    def test
      # @profile = Profile.new(name: "Test", hour: :ty2, day: 22, month: :thin, year: {stem: :tan, branch: :mui})
      @profile = Profile.new(name: "Test", gender: :female, hour: :dan, day: 28, month: :than, year: {stem: :tan, branch: :mui})

      self_position, body_position = calc_self_body_position(@profile.birth_hour, @profile.birth_month)
      palaces = calc_palaces_positions(self_position)
      cuc_element, cuc_number = calc_cuc(self_position, @profile.birth_year.stem)
      forteen_main_stars = calc_forteen_main_stars(cuc_element, cuc_number, @profile.birth_day)

      binding.pry
    end
  end
end