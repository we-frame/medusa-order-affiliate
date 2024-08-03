"use client";

import { RouteConfig } from "@medusajs/admin";
import { useAdminCustomers } from "medusa-react";
import { AdminGetCustomersParams, Customer } from "@medusajs/medusa";
import { CurrencyDollar } from "@medusajs/icons";
import Header from "../../components/Affiliate/Header";
import { FilterAndSearchBar } from "../../components/Affiliate/FilterAndSearchBar";
import { TableContent } from "../../components/Affiliate/TableContent";
import { AffiliateStats } from "../../components/Affiliate/AffiliateStats";
import { Toaster } from "@medusajs/ui";
import { useEffect, useState } from "react";

const Page = () => {
  const s: AdminGetCustomersParams = { offset: 0, limit: 100, order: "-created_at" };
  const { customers, refetch } = useAdminCustomers(s);
  const [customerData, setCustomerData] = useState<Customer[]>([]);

  useEffect(() => {
    if (customers) {
      setCustomerData(customers);
    }
  }, [customers]);

  return (
    <>
      <Toaster position="top-right" />
      <Header
        refetch={refetch}
      />
      <div className="w-full bg-[#ffffff] rounded-xl shadow-sm">
        <FilterAndSearchBar />
        <hr />
        <AffiliateStats />
        <hr />
        <TableContent data={customerData} refetch={refetch} />
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

export default Page;
