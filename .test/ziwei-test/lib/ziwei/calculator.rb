module Ziwei
  class Calculator
    include Utils::ReuseUtils
    include Utils::CalcCommons
    include Utils::CalcForteenMainStars
    include Utils::CalcSequentialConstellations
    include Utils::CalcSixDeadlyStars

    def initialize
      @profiles = {
        "Thanh" => Profile.new(name: "Thành", hour: :ty2, day: 22, month: :thin, year: {stem: :tan, branch: :mui}),
        "Hoa" => Profile.new(name: "Hoa", gender: :female, hour: :dan, day: 28, month: :than, year: {stem: :tan, branch: :mui}),
        "Yen" => Profile.new(name: "C. Yến", gender: :female, hour: :tuat, day: 12, month: :ngo, year: {stem: :dinh, branch: :mao}),
      }
    end

    def combine_results
      self_position, body_position = calc_self_body_position(@profile.birth_hour, @profile.birth_month)
      palaces = calc_palaces_positions(self_position)
      cuc_element, cuc_number = calc_cuc(self_position, @profile.birth_year.stem)
      forteen_main_stars = calc_forteen_main_stars(cuc_element, cuc_number, @profile.birth_day)
      
      thai_tue_constellation = calc_thai_tue_constellation_positions(@profile.birth_year.branch)
      trang_sinh_constellation = calc_trang_sinh_constellation_positions(cuc_number, @profile.fate_direction)

      loc_ton_position = :dau
      six_deadly_stars_positions = calc_six_deadly_stars_positions(@profile.birth_hour, loc_ton_position)

      branches = Constants::Branches::Names.keys
      results = {}
      branches.each {|branch|
        results[branch] = {
          :palace => palaces[branch],
          :main_stars => forteen_main_stars[branch],
          :trang_sinh_constellation => trang_sinh_constellation[branch],
          :good_stars => [],
          :bad_stars => []
        }

        # Classify by qualities
        star = six_deadly_stars_positions[branch]
        results[branch][:bad_stars] << star if star

        # Classify by qualities
        star = thai_tue_constellation[branch]
        quality = Constants::ThaiTueConstellation::Qualities[star]
        results[branch]["#{quality}_stars".to_sym] << star
      }

      results
    end

    def test(profile_name = "Thanh")
      @profile = @profiles[profile_name]
      combine_results
    end
  end
end