import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import AffilateOrderService from "../../../../services/affilateOrder";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const affilateOrderService: AffilateOrderService =
    req.scope.resolve<AffilateOrderService>("analyticsService");
  const orderId = req.params["id"] as string;
  console.log("orderId ", orderId);
  const affilateOrder = affilateOrderService.getAffilateOrderById(orderId);
  console.log("affilateOrder ", affilateOrder);
  res.json(affilateOrder);
}
