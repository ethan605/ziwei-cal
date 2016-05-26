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

      ElementColors = {
        :hoa => "red",
        :tho => "orange",
        :moc => "darkgreen",
        :kim => "darkgrey",
        :thuy => "black"
      }

      PlaceQualityColors = {
        "M" => "red",
        "V" => "orange",
        "Đ" => "yellowgreen",
        "B" => "darkgreen",
        "H" => "darkgrey"
      }

      AgeSymbols = {
        "Giáp Tý" => "Hải Trung KIM",
        "Ất Sửu" => "Hải Trung KIM",
        "Bính Dần" => "Lô Trung HOẢ",
        "Đinh Mão" => "Lô Trung HOẢ",
        "Mậu Thìn" => "Đại Lâm MỘC",
        "Kỷ Ty" => "Đại Lâm MỘC",
        "Canh Ngọ" => "Lộ Bàng THỔ",
        "Tân Mùi" => "Lộ Bàng THỔ",
        "Nhâm Thân" => "Kiếm Phong KIM",
        "Quý Dậu" => "Kiếm Phong KIM",
        "Giáp Tuất" => "Sơn Đầu HOẢ",
        "Ất Hợi" => "Sơn Đầu HOẢ",
        "Bính Tý" => "Giang Hạ THUỶ",
        "Đinh Sửu" => "Giang Hạ THUỶ",
        "Mậu Dần" => "Thành Đầu THỔ",
        "Kỹ Mão" => "Thành Đầu THỔ",
        "Canh Thìn" => "Bạch Lạp KIM",
        "Tân Ty" => "Bạch Lạp KIM",
        "Nhâm Ngọ" => "Dương Liễu MỘC",
        "Quý Mùi" => "Dương Liễu MỘC",
        "Giáp Thân" => "Tuyền Trung THUỶ",
        "Ất Dậu" => "Tuyền Trung THUỶ",
        "Bính Tuất" => "Ốc Thượng THỔ",
        "Đinh Hợi" => "Ốc Thượng THỔ",
        "Mậu Tý" => "Tích Lịch HOẢ",
        "Kỷ Sửu" => "Tích Lịch HOẢ",
        "Canh Dần" => "Tùng Bách MỘC",
        "Tân Mão" => "Tùng Bách MỘC",
        "Nhâm Thìn" => "Trường Lưu THUỶ",
        "Quý Ty" => "Trường Lưu THUỶ",
        "Giáp Ngọ" => "Sa Trung KIM",
        "Ất Mùi" => "Sa Trung KIM",
        "Bính Thân" => "Sơn Hạ HOẢ",
        "Đinh Dậu" => "Sơn Hạ HOẢ",
        "Mậu Tuất" => "Bình Địa MỘC",
        "Kỷ Hợi" => "Bình Địa MỘC",
        "Canh Tý" => "Bích Thượng THỔ",
        "Tân Sửu" => "Bích Thượng THỔ",
        "Nhâm Dần" => "Kim Bạch KIM",
        "Quý Mão" => "Kim Bạch KIM",
        "Giáp Thìn" => "Phú Đăng HOẢ",
        "Ất Ty" => "Phú Đăng HOẢ",
        "Bính Ngọ" => "Thiên Hà THUỶ",
        "Đinh Mùi" => "Thiên Hà THUỶ",
        "Mậu Thân" => "Đại Trạch THỔ",
        "Kỷ Dậu" => "Đại Trạch THỔ",
        "Canh Tuất" => "Thoa Xuyến KIM",
        "Tân Hợi" => "Thoa Xuyến KIM",
        "Nhâm Tý" => "Tang Đốc MỘC",
        "Quý Sửu" => "Tang Đốc MỘC",
        "Giáp Dần" => "Đại Khê THUỶ",
        "Ất Mão" => "Đại Khê THUỶ",
        "Bính Thìn" => "Sa Trung THỔ",
        "Đinh Ty" => "Sa Trung THỔ",
        "Mậu Ngọ" => "Thiên Thượng HOẢ",
        "Kỷ Mùi" => "Thiên Thượng HOẢ",
        "Canh Thân" => "Thạch Lựu MỘC",
        "Tân Dậu" => "Thạch Lựu MỘC",
        "Nhâm Tuất" => "Đại Hải THUỶ",
        "Quý Hợi" => "Đại Hải THUỶ"
      }

      AgeElements = {
        "Giáp Tý" => :kim,
        "Ất Sửu" => :kim,
        "Bính Dần" => :hoa,
        "Đinh Mão" => :hoa,
        "Mậu Thìn" => :moc,
        "Kỷ Ty" => :moc,
        "Canh Ngọ" => :tho,
        "Tân Mùi" => :tho,
        "Nhâm Thân" => :kim,
        "Quý Dậu" => :kim,
        "Giáp Tuất" => :hoa,
        "Ất Hợi" => :hoa,
        "Bính Tý" => :thuy,
        "Đinh Sửu" => :thuy,
        "Mậu Dần" => :tho,
        "Kỹ Mão" => :tho,
        "Canh Thìn" => :kim,
        "Tân Ty" => :kim,
        "Nhâm Ngọ" => :moc,
        "Quý Mùi" => :moc,
        "Giáp Thân" => :thuy,
        "Ất Dậu" => :thuy,
        "Bính Tuất" => :tho,
        "Đinh Hợi" => :tho,
        "Mậu Tý" => :hoa,
        "Kỷ Sửu" => :hoa,
        "Canh Dần" => :moc,
        "Tân Mão" => :moc,
        "Nhâm Thìn" => :thuy,
        "Quý Ty" => :thuy,
        "Giáp Ngọ" => :kim,
        "Ất Mùi" => :kim,
        "Bính Thân" => :hoa,
        "Đinh Dậu" => :hoa,
        "Mậu Tuất" => :moc,
        "Kỷ Hợi" => :moc,
        "Canh Tý" => :tho,
        "Tân Sửu" => :tho,
        "Nhâm Dần" => :kim,
        "Quý Mão" => :kim,
        "Giáp Thìn" => :hoa,
        "Ất Ty" => :hoa,
        "Bính Ngọ" => :thuy,
        "Đinh Mùi" => :thuy,
        "Mậu Thân" => :tho,
        "Kỷ Dậu" => :tho,
        "Canh Tuất" => :kim,
        "Tân Hợi" => :kim,
        "Nhâm Tý" => :moc,
        "Quý Sửu" => :moc,
        "Giáp Dần" => :thuy,
        "Ất Mão" => :thuy,
        "Bính Thìn" => :tho,
        "Đinh Ty" => :tho,
        "Mậu Ngọ" => :hoa,
        "Kỷ Mùi" => :hoa,
        "Canh Thân" => :moc,
        "Tân Dậu" => :moc,
        "Nhâm Tuất" => :thuy,
        "Quý Hợi" => :thuy
      }
    end
  end
end