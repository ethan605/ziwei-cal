module Ziwei
  module Utils
    module CalcForteenMainStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_forteen_main_stars(cuc_element, cuc_number, birth_day)
          stars = [:tu_vi, :thien_co, :liem_trinh, :vu_khuc, :thai_duong, :thien_dong, :pha_quan, :thien_phu, :thai_am, :tham_lang, :cu_mon, :thien_tuong, :thien_luong, :that_sat]

          stars_positions = []

          tu_vi = calc_tu_vi_position(cuc_element, cuc_number, birth_day)
          stars_positions << tu_vi
          stars_positions += calc_co_liem_vu_position(tu_vi)
          stars_positions += calc_nhat_dong_position(stars_positions[3])
          
          pha_quan = calc_pha_quan_position(tu_vi)
          stars_positions << pha_quan
          stars_positions += calc_thien_phu_constellation_position(pha_quan)

          main_stars_positions = {}

          stars.each_with_index {|star, index|
            main_stars_positions[stars_positions[index]] ||= []
            main_stars_positions[stars_positions[index]] << star
          }

          main_stars_positions
        end

        def calc_tu_vi_position(cuc_element, cuc_number, birth_day)
          mod = birth_day % cuc_number
          quotient = birth_day / cuc_number

          if mod == 0
            dan_index = Configs::Branches::Indexes[:dan]
            tu_vi_index = dan_index.limit_inc(quotient-1)

            return Configs::Branches::Orders[tu_vi_index]
          end

          # mod > 0
          kmtln_table = Ziwei::Configs::Wuxing::KmtlnTable.values
          kmtln_start = kmtln_table.index(Ziwei::Configs::Wuxing::KmtlnTable[cuc_element])
          kmtln_index = kmtln_start + mod - 1
          counting_start_position = kmtln_table[kmtln_index]
          
          return counting_start_position if birth_day < cuc_number

          # mod > 0 & birth_day > cuc_number
          counting_start_index = Configs::Branches::Indexes[counting_start_position]
          tu_vi_index = counting_start_index.limit_inc(quotient)

          Configs::Branches::Orders[tu_vi_index]
        end

        # Cơ (Thiên Cơ); Liêm (Liêm Trinh) & Vũ (Vũ Khúc)
        def calc_co_liem_vu_position(tu_vi_position)
          tu_vi_index = Configs::Branches::Indexes[tu_vi_position]
          
          [
            Configs::Branches::Orders[tu_vi_index.limit_inc(-1)],
            Configs::Branches::Orders[tu_vi_index.limit_inc(4)],
            Configs::Branches::Orders[tu_vi_index.limit_inc(-4)]
          ]
        end

        # Nhật (Thái Dương) & Đồng (Thiên Đồng)
        def calc_nhat_dong_position(vu_khuc_position)
          vu_khuc_index = Configs::Branches::Indexes[vu_khuc_position]
          
          [
            Configs::Branches::Orders[vu_khuc_index.limit_inc(1)],
            Configs::Branches::Orders[vu_khuc_index.limit_inc(-1)]
          ]
        end

        # Phá Quân
        def calc_pha_quan_position(tu_vi_position)
          tu_vi_index = Configs::Branches::Indexes[tu_vi_position]
          Configs::Branches::Orders[tu_vi_index.reflect_index]
        end

        def calc_thien_phu_constellation_position(pha_quan_position)
          pha_quan_index = Configs::Branches::Indexes[pha_quan_position]

          # Thiên Phủ
          thien_phu_index = pha_quan_index.limit_inc(2)
          constelation_positions = [Configs::Branches::Orders[thien_phu_index]]

          # Nguyệt - Tham - Cự - Tướng - Lương - Sát
          6.times {
            thien_phu_index = thien_phu_index.limit_inc
            constelation_positions << Configs::Branches::Orders[thien_phu_index]
          }

          constelation_positions
        end
      end
      
      def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
      end
    end
  end
end