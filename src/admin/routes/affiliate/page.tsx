"use client";

import { RouteConfig } from "@medusajs/admin";
import { useAdminCustomers } from "medusa-react";
import { AdminGetCustomersParams } from "@medusajs/medusa";
import { CurrencyDollar } from "@medusajs/icons";
import Header from "../../components/Affiliate/Header";
import { FilterAndSearchBar } from "../../components/Affiliate/FilterAndSearchBar";
import { TableContent } from "../../components/Affiliate/TableContent";
import { AffiliateStats } from "../../components/Affiliate/AffiliateStats";
import { Toaster } from "@medusajs/ui";
import { useEffect, useState } from "react";
import { Customer } from "../../../models/customer";

const Page = () => {
  const s: AdminGetCustomersParams = { offset: 0, limit: 100, order: "-created_at",  };
  const { customers, refetch } = useAdminCustomers(s);
  const [customerData, setCustomerData] = useState<Customer[]>([]);

  useEffect(() => {
    if (customers) {

      const filteredCustomer: Customer[] = []
      customers.forEach((customer: Customer) => {
        if (customer.is_affiliate != null && customer.is_affiliate == true) {
          filteredCustomer.push(customer)
        }
      })
      setCustomerData(filteredCustomer);
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

// export const config: RouteConfig = {
//   link: {
//     label: " Affiliate",
//     icon: CurrencyDollar,
//   },
// };

export default Page;
