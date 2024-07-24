import type { WidgetConfig } from "@medusajs/admin"

const ProductWidget = () => {
  return (
    <div className="bg-white p-8 border border-gray-200 rounded-lg">
      <h1>Product Page: Rendered From Weframe Medusa Plugin</h1>
    </div>
  )
}

export const config: WidgetConfig = {
  zone: "product.details.before",
}

export default ProductWidget