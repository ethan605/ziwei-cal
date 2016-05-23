module Ziwei
  class Profile
    attr_reader :name, :gender
    attr_reader :birth_day
    attr_reader :birth_hour, :birth_month, :birth_year_stem, :birth_year_branch

    attr_reader :fate_direction

    def initialize(args = {})
      @name = args[:name] || args["name"] || "Tên"

      @gender = args[:gender] || args["gender"]
      @gender = :male unless Constants::Genders::Names.keys.include?(@gender)

      @birth_hour = args[:birth_hour] || args["birth_hour"] || args[:hour] || args["hour"]
      @birth_hour = :ty unless Constants::Branches::Names.keys.include?(@birth_hour)

      @birth_day = args[:birth_day] || args["birth_day"] || args[:day] || args["day"] || 1
      @birth_day = 1 if @birth_day <= 0 || @birth_day > 30

      @birth_month = args[:birth_month] || args["birth_month"] || args[:month] || args["month"]
      @birth_month = :ty unless Constants::Branches::Names.keys.include?(@birth_month)

      @birth_year_stem = args[:birth_year_stem] || args["birth_year_stem"] || args[:year_stem] || args["year_stem"]
      @birth_year_stem = :giap unless Constants::Stems::Names.keys.include?(@birth_year_stem)

      @birth_year_branch = args[:birth_year_branch] || args["birth_year_branch"] || args[:year_branch] || args["year_branch"]
      @birth_year_branch = :ty unless Constants::Branches::Names.keys.include?(@birth_year_branch)

      @fate_direction = Constants::Stems::Directions[@birth_year_stem] * Constants::Genders::Directions[@gender]
    end

    def inspect
      "<Ziwei::Profile - Name: %s - Gender: %s %s - Birthday: %s %d/%s/%s %s>" %
      [
        @name,
        Constants::Stems::Yinyang[Constants::Stems::Directions[@birth_year_stem]],
        Constants::Genders::Names[@gender],
        Constants::Branches::Names[@birth_hour],
        @birth_day,
        Constants::Branches::Names[@birth_month],
        Constants::Stems::Names[@birth_year_stem],
        Constants::Branches::Names[@birth_year_branch]
      ]
    end
  end
end