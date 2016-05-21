module Ziwei
  class Profile
    attr_reader :name
    attr_reader :gender
    
    attr_reader :b_hour
    attr_reader :b_day
    attr_reader :b_month
    attr_reader :b_year_stem
    attr_reader :b_year_branch

    attr_reader :fate_direction

    def initialize(args = {})
      @name = args[:name] || args["name"] || "Tên"

      @gender = args[:gender] || args["gender"]
      @gender = :male unless Constants::Genders::Names.keys.include?(@gender)

      @b_hour = args[:b_hour] || args["b_hour"] || args[:hour] || args["hour"]
      @b_hour = :ty unless Constants::Branches::Names.keys.include?(@b_hour)

      @b_day = args[:b_day] || args["b_day"] || args[:day] || args["day"] || 1
      @b_day = 1 if @b_day <= 0 || @b_day > 30

      @b_month = args[:b_month] || args["b_month"] || args[:month] || args["month"]
      @b_month = :ty unless Constants::Branches::Names.keys.include?(@b_month)

      @b_year_stem = args[:b_year_stem] || args["b_year_stem"] || args[:year_stem] || args["year_stem"]
      @b_year_stem = :giap unless Constants::Stems::Names.keys.include?(@b_year_stem)

      @b_year_branch = args[:b_year_branch] || args["b_year_branch"] || args[:year_branch] || args["year_branch"]
      @b_year_branch = :ty unless Constants::Branches::Names.keys.include?(@b_year_branch)

      @fate_direction = Constants::Stems::Directions[@b_year_stem] * Constants::Genders::Directions[@gender]
    end

    def inspect
      "<Ziwei::Profile - Name: %s - Gender: %s %s - Birthday: %s %d/%s/%s %s>" %
      [
        @name,
        Constants::Stems::Yinyang[Constants::Stems::Directions[@b_year_stem]],
        Constants::Genders::Names[@gender],
        Constants::Branches::Names[@b_hour],
        @b_day,
        Constants::Branches::Names[@b_month],
        Constants::Stems::Names[@b_year_stem],
        Constants::Branches::Names[@b_year_branch]
      ]
    end
  end
end