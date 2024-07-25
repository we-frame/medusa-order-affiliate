import { RouteConfig } from "@medusajs/admin";
import { useAdminCustomers } from "medusa-react";
import { AdminGetCustomersParams, Customer } from "@medusajs/medusa";
import { CurrencyDollar } from "@medusajs/icons";
import Header from "../../components/Affiliate/Header";
import { FilterAndSearchBar } from "../../components/Affiliate/FilterAndSearchBar";
import { TableContent } from "../../components/Affiliate/TableContent";
import { AffiliateStats } from "../../components/Affiliate/AffiliateStats";

const AffiliatePage = () => {
  const s: AdminGetCustomersParams = { offset: 0, limit: 15 };
  const { customers } = useAdminCustomers(s);
  console.log("Customers Data ::", customers);

  let customerData;
  if (customers != null) {
    customerData = customers?.map((order) => order);
  } else {
    customerData = [];
  }

  return (
    <>
      <Header />
      <div className="w-full bg-[#ffffff] rounded-xl shadow-sm">
        <FilterAndSearchBar />
        <hr />
        <AffiliateStats />
        <hr />
        <TableContent data={customerData} />
      </div>
    </>
  );
};

export const config: RouteConfig = {
  link: {
    label: " Affiliate",
    icon: CurrencyDollar,
  },
};

export default AffiliatePage;
