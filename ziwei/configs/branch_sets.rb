module Ziwei
  module Configs
    module BranchSets
      module Trilogy
        ByElements = {
          :hoa => [:dan, :ngo, :tuat],
          :thuy => [:than, :ty, :thin],
          :kim => [:ty2, :dau, :suu],
          :moc => [:hoi, :mao, :mui]
        }

        ByBranches = {
          :ty => :thuy,
          :suu => :kim,
          :dan => :hoa,
          :mao => :moc,
          :thin => :thuy,
          :ty2 => :kim,
          :ngo => :hoa,
          :mui => :moc,
          :than => :thuy,
          :dau => :kim,
          :tuat => :hoa,
          :hoi => :moc
        }
      end

      module Quadrilogy
      end
    end
  end
end