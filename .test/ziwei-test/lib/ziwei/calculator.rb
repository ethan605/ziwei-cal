module Ziwei
  class Calculator
    include Utils::ReuseUtils
    include Utils::CalcCommons
    include Utils::CalcForteenMainStars
    include Utils::CalcSequentialConstellations
    include Utils::CalcSixDeadlyStars

    def initialize
      @profiles = {
        "Thanh" => Model::Profile.new(name: "Thành", hour: :ty2, day: 22, month: :thin, year: {stem: :tan, branch: :mui}),
        "Hoa" => Model::Profile.new(name: "Hoa", gender: :female, hour: :dan, day: 28, month: :than, year: {stem: :tan, branch: :mui}),
        "Yen" => Model::Profile.new(name: "C. Yến", gender: :female, hour: :tuat, day: 12, month: :ngo, year: {stem: :dinh, branch: :mao}),
      }
    end

    def raw_results
      self_position, body_position = calc_self_body_position(@profile.birth_hour, @profile.birth_month)
      palaces = calc_palaces_positions(self_position)
      cuc_element, cuc_number = calc_cuc(self_position, @profile.birth_year.stem)
      forteen_main_stars = calc_forteen_main_stars(cuc_element, cuc_number, @profile.birth_day)
      
      loc_ton_position = :dau

      thai_tue_constellation = calc_thai_tue_constellation_positions(@profile.birth_year.branch)
      trang_sinh_constellation = calc_trang_sinh_constellation_positions(cuc_number, @profile.fate_direction)
      loc_ton_constellation = calc_loc_ton_constellation_positions(loc_ton_position, @profile.fate_direction)

      six_deadly_stars_positions = calc_six_deadly_stars_positions(@profile.birth_hour, loc_ton_position)

      branches = Configs::Branches::Names.keys
      results = {}
      branches.each {|branch|
        results[branch] = {
          :palace => palaces[branch],
          :main_stars => forteen_main_stars[branch] || [],
          :trang_sinh_constellation => trang_sinh_constellation[branch],
          :good_stars => [],
          :bad_stars => []
        }

        results[branch][:good_stars] << :loc_ton if branch == loc_ton_position

        # Classify by qualities
        star = six_deadly_stars_positions[branch]
        results[branch][:bad_stars] << star if star

        star = thai_tue_constellation[branch]
        quality = Configs::ThaiTueConstellation::Qualities[star]
        results[branch]["#{quality}_stars".to_sym] << star

        star = loc_ton_constellation[branch]
        quality = Configs::LocTonConstellation::Qualities[star]
        results[branch]["#{quality}_stars".to_sym] << star
      }

      results
    end

    def full_result(raw_results)
    end

    def short_result(raw_results)
    end

    def test(profile_name = "Thanh")
      @profile = @profiles[profile_name]
      raw_results
    end
  end
end