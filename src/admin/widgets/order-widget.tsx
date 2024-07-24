import type { WidgetConfig } from "@medusajs/admin";

const OrderWidget = () => {
    return (
        <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <h1>Order Page: Rendered From Weframe Medusa Plugin</h1>
        </div>
    )
}

export const config: WidgetConfig = {
    zone: "order.details.before",
}

export default OrderWidget