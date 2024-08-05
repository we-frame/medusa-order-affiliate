import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { fileURLToPath } from "url";
import { OrdersService } from "../../../../services/order";
import { Order } from "../../../../models/order";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const ordersService:OrdersService = req.scope.resolve<OrdersService>("ordersService")
    // total_sales
    // affiliate_earning
    // average_sales

    const {id} = req.params;
    const response:Order = await ordersService.getOrderById(id as string);
    res.json(response)
}

