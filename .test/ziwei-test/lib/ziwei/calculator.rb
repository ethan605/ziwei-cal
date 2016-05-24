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
      # @profiles = {
      #   "Thanh" => Models::Profile.new(name: "Thành", hour: :ty2, day: 22, month: :thin, year: {stem: :tan, branch: :mui}),
      #   "Hoa" => Models::Profile.new(name: "Hoa", gender: :female, hour: :dan, day: 28, month: :than, year: {stem: :tan, branch: :mui}),
      #   "Yen" => Models::Profile.new(name: "C. Yến", gender: :female, hour: :tuat, day: 12, month: :ngo, year: {stem: :dinh, branch: :mao}),
      # }
      prepare_profiles_data
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

    def prepare_profiles_data
      # [:name, :gender, :hour, :day, :month, :year_stem, :year_branch]
      raw_data = [
        ["anhctv", "Chu Thị Vân Anh", "Nữ", "Mão", "14", "Dần", "Bính", "Dần"],
        ["chind", "Nguyễn Diệp Chi", "Nữ", "Mão", "23", "Tỵ", "Giáp", "Ngọ"],
        ["dangnh", "Nguyễn Hải Đăng", "Nam", "Thân", "1", "Hợi", "Tân", "Mùi"],
        ["ducnm", "Nguyễn Minh Đức", "Nam", "Mão", "15", "Hợi", "Mậu", "Tý"],
        ["gianghh", "Hà Hương Giang", "Nữ", "Dần", "7", "Thìn", "Tân", "Mùi"],
        ["hoactq", "Chu Thị Quỳnh Hoa", "Nữ", "Dần", "28", "Thân", "Tân", "Mùi"],
        ["huyennth", "Nguyễn Thị Thu Huyền", "Nữ", "Tỵ", "5", "Thìn", "Giáp", "Tý"],
        ["khoin", "Nguyễn Khôi", "Nam", "Mùi", "2", "Thìn", "Tân", "Mùi"],
        ["nam_1", "Nam 1", "Nam", "Mão", "16", "Ngọ", "Quý", "Dậu"],
        ["nam_1", "Nam 2", "Nam", "Dần", "29", "Tý", "Kỷ", "Mùi"],
        ["ngocpb", "Phùng Bá Ngọc", "Nam", "Tý", "22", "Sửu", "Nhâm", "Thân"],
        ["nu_1", "Nữ 1", "Nữ", "Hợi", "10", "Hợi", "Giáp", "Thìn"],
        ["nu_2", "Nữ 2", "Nữ", "Mão", "3", "Tuất", "Canh", "Ngọ"],
        ["nu_3", "Nữ 3", "Nữ", "Dần", "24", "Mùi", "Đinh", "Mão"],
        ["nu_4", "Nữ 4", "Nữ", "Sửu", "29", "Dần", "Đinh", "Sửu"],
        ["nu_5", "Nữ 5", "Nữ", "Mùi", "14", "Dậu", "Quý", "Dậu"],
        ["nu_6", "Nữ 6", "Nữ", "Mão", "26", "Ngọ", "Tân", "Hợi"],
        ["oanhntm", "Nguyễn Thị Mai Oanh", "Nữ", "Tỵ", "14", "Sửu", "Giáp", "Dần"],
        ["thanhnx", "Nguyễn Xuân Thành", "Nam", "Tỵ", "22", "Thìn", "Tân", "Mùi"],
        ["trungnt", "Trung NT", "Nam", "Tý", "10", "Ngọ", "Nhâm", "Tý"],
        ["trungnt2", "Nguyễn Thành Trung", "Nam", "Hợi", "19", "Dậu", "Nhâm", "Tuất"],
        ["trungpt", "Phùng Thành Trung", "Nam", "Tý", "21", "Mùi", "Quý", "Dậu"],
        ["tuanpm", "Tuấn PM", "Nam", "Thân", "28", "Thân", "Ất", "Mão"],
        ["yenbth", "Bùi Thị Hải Yến", "Nữ", "Tuất", "12", "Ngọ", "Đinh", "Mão"]
      ]

      @profiles = {}

      raw_data.each {|arr|
        profile_data = {
          name: arr[1],
          gender: Ziwei::Configs::Genders::Converts[arr[2]],
          hour: Ziwei::Configs::Branches::Converts[arr[3]],
          day: arr[4].to_i,
          month: Ziwei::Configs::Branches::Converts[arr[5]],
          year: {
            stem: Ziwei::Configs::Stems::Converts[arr[6]],
            branch: Ziwei::Configs::Branches::Converts[arr[7]]
          }
        }

        @profiles[arr.first] = Ziwei::Models::Profile.new(profile_data)
      }
    end

    def test(profile_name = "thanhnx")
      @profile = @profiles[profile_name]
      raise "Invalid profile key" unless @profile

      result_table = calc_result_table
      %w[full short].each {|prefix|
        File.write(
          "#{Rails.root}/lib/ziwei/tests/#{profile_name}_#{prefix}.json",
          JSON.pretty_generate(result_table.send("#{prefix}_names".to_sym).as_json)
        )
      }
      
      result_table
    end
  end
end