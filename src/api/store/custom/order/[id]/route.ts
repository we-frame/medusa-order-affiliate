import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import AffilateOrderService from "../../../../../services/affilateOrder";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const affilateOrderService = new AffilateOrderService();
    const orderId = req.params["id"] as string;
    const affilateOrder = await affilateOrderService.getAffilateOrderById(
      orderId
    );
    // console.log("affilateOrder ", affilateOrder);
    res.json(affilateOrder);
  } catch (e) {
    res.json(e);
  }
}
