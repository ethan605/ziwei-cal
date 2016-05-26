module Ziwei
  module Models
    class Profile
      attr_reader :key, :name
      attr_reader :gender, :yinyang_gender
      attr_reader :birth_day
      attr_reader :birth_hour, :birth_month, :birth_year
      attr_reader :fate_direction
      attr_reader :cuc_element, :cuc_number

      def initialize(args = {})
        @key = args[:key] || args["key"] || "keyname"
        @name = args[:name] || args["name"] || "Họ Và Tên"

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

        stem_direction = Configs::Stems::Directions[@birth_year.stem]

        @yinyang_gender = [
          Configs::Stems::Yinyang[stem_direction],
          Configs::Genders::Names[@gender]
        ].join(" ")

        @fate_direction = stem_direction * Configs::Genders::Directions[@gender]
      end

      def update_cuc(cuc_element, cuc_number)
        @cuc_element = cuc_element
        @cuc_number = cuc_number
      end

      def detail
        "%s, sinh giờ %s ngày %d tháng %s năm %s" %
        [
          @yinyang_gender,
          Configs::Branches::Names[@birth_hour],
          @birth_day,
          Configs::Branches::Names[@birth_month],
          @birth_year.inspect
        ]
      end

      def inspect
        "<Ziwei::Models::Profile - Name: %s - Gender: %s - Birthday: %s %d/%s/%s>" %
        [
          @name,
          @yinyang_gender,
          Configs::Branches::Names[@birth_hour],
          @birth_day,
          Configs::Branches::Names[@birth_month],
          @birth_year.inspect
        ]
      end
    end
  end
end