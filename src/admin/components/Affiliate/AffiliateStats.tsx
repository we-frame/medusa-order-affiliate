import { AffiliateStatsComponent } from "./AffiliateStatsComponent";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { useState, useEffect } from "react";

interface Analytics {
  total_sales: number, 
  affiliate_earning: number, 
  average_sales: number
};

export const AffiliateStats = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  async function fetchAnalytics() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/admin/analytics?fields=*`, {
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
        title="Available Earnings"
      />
      <AffiliateStatsComponent
        amount={`$${analytics?.average_sales}`}
        icon={<FaHandHoldingDollar size={18} color="#2198ff" />}
        title="Avg Sales"
      />
    </div>
  );
};


