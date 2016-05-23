module Ziwei
  module Model
    class Profile
      attr_reader :name, :gender
      attr_reader :birth_day
      attr_reader :birth_hour, :birth_month, :birth_year
      attr_reader :fate_direction

      def initialize(args = {})
        @name = args[:name] || args["name"] || "Tên"

        @gender = args[:gender] || args["gender"]
        @gender = :male unless Configs::Genders::Names.keys.include?(@gender)

        @birth_hour = args[:birth_hour] || args["birth_hour"] || args[:hour] || args["hour"]
        @birth_hour = :ty unless Configs::Branches::Names.keys.include?(@birth_hour)

        @birth_day = args[:birth_day] || args["birth_day"] || args[:day] || args["day"] || 1
        @birth_day = 1 if @birth_day <= 0 || @birth_day > 30

        @birth_month = args[:birth_month] || args["birth_month"] || args[:month] || args["month"]
        @birth_month = :ty unless Configs::Branches::Names.keys.include?(@birth_month)

        birth_year = args[:birth_year] || args["birth_year"] || args[:year] || args["year"]
        @birth_year = GanZhi.new(birth_year)

        @fate_direction = Configs::Stems::Directions[@birth_year.stem] * Configs::Genders::Directions[@gender]
      end

      def inspect
        "<Ziwei::Model::Profile - Name: %s - Gender: %s %s - Birthday: %s %d/%s/%s>" %
        [
          @name,
          Configs::Stems::Yinyang[Configs::Stems::Directions[@birth_year_stem]],
          Configs::Genders::Names[@gender],
          Configs::Branches::Names[@birth_hour],
          @birth_day,
          Configs::Branches::Names[@birth_month],
          @birth_year.inspect
        ]
      end
    end
  end
end