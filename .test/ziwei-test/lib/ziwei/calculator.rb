module Ziwei
  class Calculator
    include Utils::ReuseUtils
    include Utils::CalcCommons
    include Utils::CalcForteenMainStars
    include Utils::CalcOtherImportantStars
    include Utils::CalcSequentialConstellations
    include Utils::CalcSixDeadlyStars
    include Utils::CalcSixLuckyStars

    def initialize
      @profiles = {
        "Thanh" => Models::Profile.new(name: "Thành", hour: :ty2, day: 22, month: :thin, year: {stem: :tan, branch: :mui}),
        "Hoa" => Models::Profile.new(name: "Hoa", gender: :female, hour: :dan, day: 28, month: :than, year: {stem: :tan, branch: :mui}),
        "Yen" => Models::Profile.new(name: "C. Yến", gender: :female, hour: :tuat, day: 12, month: :ngo, year: {stem: :dinh, branch: :mao}),
      }
    end

    def calc_result_table
      self_position, body_position = calc_self_body_position(@profile.birth_hour, @profile.birth_month)
      palaces = calc_palaces_positions(self_position)
      cuc_element, cuc_number = calc_cuc(self_position, @profile.birth_year.stem)

      forteen_main_stars = calc_forteen_main_stars(cuc_element, cuc_number, @profile.birth_day)
      other_important_stars = calc_other_important_stars(@profile.birth_year.stem, @profile.birth_year.branch)
      loc_ton_position = other_important_stars.key(:loc_ton)

      opportunity_ages = calc_opportunity_ages(self_position, cuc_number, @profile.fate_direction)

      thai_tue_constellation = calc_thai_tue_constellation_positions(@profile.birth_year.branch)
      trang_sinh_constellation = calc_trang_sinh_constellation_positions(cuc_number, @profile.fate_direction)
      loc_ton_constellation = calc_loc_ton_constellation_positions(loc_ton_position, @profile.fate_direction)

      six_deadly_stars_positions = calc_six_deadly_stars_positions(@profile.birth_hour, loc_ton_position)
      six_lucky_stars_positions = calc_six_lucky_stars_positions(@profile.birth_month, @profile.birth_hour)

      branches = Configs::Branches::Names.keys
      results = {}
      branches.each {|branch|
        results[branch] = {
          :name => palaces[branch],
          :is_body => (branch == body_position),
          :main_stars => forteen_main_stars[branch] || [],
          :trang_sinh_constellation => trang_sinh_constellation[branch],
          :good_stars => [],
          :bad_stars => [],
          :opportunity_age => opportunity_ages[branch]
        }

        # Classify by qualities
        star = other_important_stars[branch]
        if star
          quality = Configs::OtherImportantStars::Qualities[star]
          results[branch]["#{quality}_stars".to_sym] << star
        end

        star = six_deadly_stars_positions[branch]
        results[branch][:bad_stars] << star if star

        star = six_lucky_stars_positions[branch]
        results[branch][:good_stars] << star if star

        star = thai_tue_constellation[branch]
        quality = Configs::ThaiTueConstellation::Qualities[star]
        results[branch]["#{quality}_stars".to_sym] << star

        star = loc_ton_constellation[branch]
        quality = Configs::LocTonConstellation::Qualities[star]
        results[branch]["#{quality}_stars".to_sym] << star
      }

      Models::ResultTable.new(results)
    end

    def test(profile_name = "Thanh")
      @profile = @profiles[profile_name]
      calc_result_table
    end
  end
end