import type { WidgetConfig } from "@medusajs/admin"
import { Link } from "react-router-dom"

const CustomerWidget = () => {
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg">
        <Link className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" to={"/a/orders"}>
          All
        </Link>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={"/a/affiliate"}>
          Affiliate
        </Link>
    </div>
  )
}

export const config: WidgetConfig = {
  zone: "customer.list.before",
}

export default CustomerWidget