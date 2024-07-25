import { AffiliateStatsComponent } from "./AffiliateStatsComponent";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { FaHandHoldingDollar } from "react-icons/fa6";

export const AffiliateStats = () => {
  return (
    <div className="w-full border-t p-7 grid grid-cols-3 auto-rows-auto gap-5">
      <AffiliateStatsComponent
        amount="$21,203"
        icon={<BsCurrencyDollar size={18} color="#0fce7e" />}
        title="Total Sales"
      />
      <AffiliateStatsComponent
        amount="$19,555"
        icon={<GoGraph size={18} color="#f933a5" />}
        title="Available Earnings"
      />
      <AffiliateStatsComponent
        amount="$3,595"
        icon={<FaHandHoldingDollar size={18} color="#2198ff" />}
        title="Avg Sales"
      />
    </div>
  );
};
