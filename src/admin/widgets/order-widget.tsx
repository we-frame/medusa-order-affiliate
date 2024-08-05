import type { OrderDetailsWidgetProps, WidgetConfig } from "@medusajs/admin";

const OrderWidget = ({notify, order}: OrderDetailsWidgetProps) => {
    return (
        <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Commission</h2>
            <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                    <span>Commsion Created On</span>
                    <span>{(order?.commission_created_on != null) ? order?.commission_created_on?.toLocaleDateString() : ""}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Commsion Rate</span>
                    <span>{order?.commission_rate}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Commission Earned</span>
                    <span>{(order.commission != null) ? `$${order.commission}`: ""}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Affiliate Code</span>
                    <span>{order.code_used}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Commission Redemed</span>
                    <span>{order.payout_done ? "Yes" : "No"}</span>
                </div>
            </div>
        </div>
    )
}

export const config: WidgetConfig = {
    zone: "order.details.after",
}

export default OrderWidget
// _moap_aff_code