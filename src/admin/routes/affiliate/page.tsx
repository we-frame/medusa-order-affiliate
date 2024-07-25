import { RouteConfig } from "@medusajs/admin";
import { AiFillDollarCircle } from "react-icons/ai";
import { useAdminCustomers } from "medusa-react"
import { AdminGetCustomersParams, Customer } from "@medusajs/medusa";

const AffiliatePage = () => {
  const s: AdminGetCustomersParams = {offset: 0, limit: 15};
  const {customers} = useAdminCustomers(s);
  console.log("medusa-order-affiliate ============");
  console.log(customers);
  console.log("===================================");

  let customerData;
  if (customers != null)  {
    customerData = customers?.map(order => order)
  } else {
    customerData = []
  }

  return (
    <div>
      <div className="bg-white p-8 border border-gray-200 rounded-lg">
          <h1>Affiliate Customers</h1>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer: Customer) => (
            <tr key={customer.id}>
              <td className="py-2 px-4 border">{customer.id}</td>
              <td className="py-2 px-4 border">{`${customer.first_name} ${customer.last_name}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const config: RouteConfig = {
  link: {
    label: " Affiliate",
    icon: AiFillDollarCircle
  }
}
  
export default AffiliatePage;