import type { OrderDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";
import { useState, useEffect } from "react";
import { Order } from "../../models/order";
import BASE_PATH from "../utils/basepath";

const OrderWidget = ({ notify, order }: OrderDetailsWidgetProps) => {
  const [newOrder, setNewOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch customer data from the server

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${BASE_PATH}/store/custom/order/${order.id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        setNewOrder(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching customer data:", error);
      }
    };
    if (order?.id) {
      fetchOrder();
    }
  }, [order]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Commission</h2>
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Commsion Created On</span>
          <span>
            {newOrder?.created_at != null
              ? `${new Date(newOrder.created_at.toString()).toLocaleDateString()}`
              : ""}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Commsion Rate</span>
          <span>{newOrder?.commission_rate} %</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Commission</span>
          <span>
            {newOrder.commission != null ? `$${newOrder.commission}` : ""}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Affiliate Code</span>
          <span>{newOrder.code_used}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Commission Redemed</span>
          <span>{newOrder.payout_done ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "order.details.after",
};

export default OrderWidget;
// _moap_aff_code
