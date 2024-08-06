import { AffiliateStatsComponent } from "./AffiliateStatsComponent";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useState, useEffect } from "react";
import BASE_PATH from "../../utils/basepath";

interface Analytics {
  total_sales: number, 
  affiliate_earning: number, 
  average_sales: number
};

export const AffiliateStats = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  async function fetchAnalytics() {
    try {
      console.log("================= base path: ", BASE_PATH);
      const response = await fetch(`${BASE_PATH}/admin/analytics?fields=*`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error("")
      }
      const data = await response.json();
      setAnalytics(data)

      console.log("analytics: ", analytics);
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, []);
  
  return (
    <div className="w-full border-t p-7 grid grid-cols-3 auto-rows-auto gap-5">
      <AffiliateStatsComponent
        amount={`$${analytics?.total_sales}`}
        icon={<BsCurrencyDollar size={18} color="#0fce7e" />}
        title="Total Sales"
      />
      <AffiliateStatsComponent
        amount={`$${analytics?.affiliate_earning}`}
        icon={<GoGraph size={18} color="#f933a5" />}
        title="Affiliate Earnings"
      />
      <AffiliateStatsComponent
        amount={`$${analytics?.average_sales}`}
        icon={<FaHandHoldingDollar size={18} color="#2198ff" />}
        title="Avg Sales"
      />
    </div>
  );
};


