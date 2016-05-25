module Ziwei
  module Configs
    module Wuxing
      Names = {
        :hoa => "Hỏa",
        :tho => "Thổ",
        :moc => "Mộc",
        :kim => "Kim",
        :thuy => "Thủy"
      }

      Converts = {
        "Hỏa" => :hoa,
        "Thổ" => :tho,
        "Mộc" => :moc,
        "Kim" => :kim,
        "Thủy" => :thuy
      }

      Elements = [:hoa, :tho, :moc, :kim, :thuy]

      CucByElements = {
        :thuy => 2,
        :moc => 3,
        :kim => 4,
        :tho => 5,
        :hoa => 6
      }

      ElementsByBranches = {
        :ty => :thuy,
        :suu => :thuy,
        :dan => :hoa,
        :mao => :hoa,
        :thin => :moc,
        :ty2 => :moc,
        :ngo => :tho,
        :mui => :tho,
        :than => :kim,
        :dau => :kim,
        :tuat => :hoa,
        :hoi => :hoa
      }

      KmtlnTable = {
        :hoa => :dau,
        :tho => :ngo,
        :kim => :hoi,
        :moc => :thin,
        :thuy => :suu
      }

      PlaceQualityColors = {
        "M" => "red",
        "V" => "orange",
        "Đ" => "yellowgreen",
        "B" => "darkgreen",
        "H" => "darkgrey"
      }
    end
  end
end