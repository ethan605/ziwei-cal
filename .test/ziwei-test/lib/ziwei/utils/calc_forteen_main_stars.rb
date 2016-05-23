module Ziwei
  module Utils
    module CalcForteenMainStars
      module ClassMethods
      end
      
      module InstanceMethods
        def calc_forteen_main_stars(cuc_element, cuc_number, birth_day)
          tu_vi = calc_tu_vi_position(cuc_element, cuc_number, birth_day)

          thien_co, liem_trinh, vu_khuc = calc_co_liem_vu_position(tu_vi)
          thai_duong, thien_dong = calc_nhat_dong_position(vu_khuc)
          pha_quan = calc_pha_quan_position(tu_vi)

          thien_phu, thai_am, tham_lang, cu_mon, thien_tuong, thien_luong, that_sat =
            calc_thien_phu_constellation_position(pha_quan)

          {
            :tu_vi => tu_vi,
            :thien_co => thien_co,
            :liem_trinh => liem_trinh,
            :thai_duong => thai_duong,
            :vu_khuc => vu_khuc,
            :thien_dong => thien_dong,
            :thien_phu => thien_phu,
            :thai_am => thai_am,
            :tham_lang => tham_lang,
            :cu_mon => cu_mon,
            :thien_tuong => thien_tuong,
            :thien_luong => thien_luong,
            :that_sat => that_sat,
            :pha_quan => pha_quan
          }
        end

        def calc_tu_vi_position(cuc_element, cuc_number, birth_day)
          mod = birth_day % cuc_number
          quotient = birth_day / cuc_number

          if mod == 0
            dan_index = Constants::Branches::Indexes[:dan]
            tu_vi_index = limit_inc(dan_index, 12, quotient-1)

            return Constants::Branches::Orders[tu_vi_index]
          end

          # mod > 0
          kmtln_table = Ziwei::Constants::Wuxing::KmtlnTable.values
          kmtln_start = kmtln_table.index(Ziwei::Constants::Wuxing::KmtlnTable[cuc_element])
          kmtln_index = kmtln_start + mod - 1
          counting_start_position = kmtln_table[kmtln_index]
          
          return counting_start_position if birth_day < cuc_number

          # mod > 0 & birth_day > cuc_number
          counting_start_index = Constants::Branches::Indexes[counting_start_position]
          tu_vi_index = limit_inc(counting_start_index, 12, quotient)

          Constants::Branches::Orders[tu_vi_index]
        end

        # Cơ (Thiên Cơ); Liêm (Liêm Trinh) & Vũ (Vũ Khúc)
        def calc_co_liem_vu_position(tu_vi_position)
          tu_vi_index = Constants::Branches::Indexes[tu_vi_position]
          
          [
            Constants::Branches::Orders[limit_dec(tu_vi_index, 12, 1)],
            Constants::Branches::Orders[limit_inc(tu_vi_index, 12, 4)],
            Constants::Branches::Orders[limit_dec(tu_vi_index, 12, 4)]
          ]
        end

        # Nhật (Thái Dương) & Đồng (Thiên Đồng)
        def calc_nhat_dong_position(vu_khuc_position)
          vu_khuc_index = Constants::Branches::Indexes[vu_khuc_position]
          
          [
            Constants::Branches::Orders[limit_inc(vu_khuc_index, 12, 1)],
            Constants::Branches::Orders[limit_dec(vu_khuc_index, 12, 1)]
          ]
        end

        # Phá Quân
        def calc_pha_quan_position(tu_vi_position)
          tu_vi_index = Constants::Branches::Indexes[tu_vi_position]
          suu_index = Constants::Branches::Indexes[:suu]

          Constants::Branches::Orders[limit_dec(suu_index, 12, tu_vi_index-suu_index)]
        end

        def calc_thien_phu_constellation_position(pha_quan_position)
          pha_quan_index = Constants::Branches::Indexes[pha_quan_position]

          # Thiên Phủ
          thien_phu_index = limit_inc(pha_quan_index, 12, 2)
          constelation_positions = [Constants::Branches::Orders[thien_phu_index]]

          # Nguyệt - Tham - Cự - Tướng - Lương - Sát
          6.times {
            thien_phu_index = limit_inc(thien_phu_index)
            constelation_positions << Constants::Branches::Orders[thien_phu_index]
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