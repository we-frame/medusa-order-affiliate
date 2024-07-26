import { RouteConfig } from "@medusajs/admin";
import { useAdminCustomers } from "medusa-react";
import { AdminGetCustomersParams, Customer } from "@medusajs/medusa";
import { CurrencyDollar } from "@medusajs/icons";
import Header from "../../components/Affiliate/Header";
import { FilterAndSearchBar } from "../../components/Affiliate/FilterAndSearchBar";
import { TableContent } from "../../components/Affiliate/TableContent";
import { AffiliateStats } from "../../components/Affiliate/AffiliateStats";
import axios from "axios";

const AffiliatePage = () => {
  const s: AdminGetCustomersParams = { offset: 0, limit: 15 };
  const { customers } = useAdminCustomers(s);
  console.log("Customers Data ::", customers);

  let customerData;
  if (customers != null) {
    customerData = customers?.map((customer) => customer);
  } else {
    customerData = [];
  }

  // const affiliateIDs: string[] = customerData.map((customer:Customer) => customer.metadata.affiliate_id)

  // const response = await axios.request({
  //   url: `${process.env.MEDUSA_API_SERVER_URL}/store/affiliate?ids=${affiliateIDs.join(",")}`,
  //   method: "GET",
  //   maxBodyLength: Infinity,
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
  // })

  // const affiliateData: AffiliateLog[] = response.data;
  // if (response.status == 200) {
  //   customerData.array.forEach((customer: Customer) => {
      
  //   });
  // }


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
