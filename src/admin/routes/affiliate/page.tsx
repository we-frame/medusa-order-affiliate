import { RouteConfig } from "@medusajs/admin";
import { AiFillDollarCircle } from "react-icons/ai";
import { useAdminOrders } from "medusa-react"
import { AdminGetOrdersParams, Order } from "@medusajs/medusa";

const AffiliatePage = () => {
  const s: AdminGetOrdersParams = {offset: 0, limit: 15};
  const {orders} = useAdminOrders(s);
  console.log("medusa-order-affiliate ============");
  console.log(orders);
  console.log("===================================");

  let orderListData;
  if (orders != null)  {
    orderListData = orders?.map(order => order)
  } else {
    orderListData = []
  }

  return (
    <div>
      <h2>Affiliate Orders</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderListData.map((order: Order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border">{order.id}</td>
              <td className="py-2 px-4 border">{order.paid_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const config: RouteConfig = {
  link: {
    label: "Affiliate",
    icon: AiFillDollarCircle
  }
}
  
export default AffiliatePage;