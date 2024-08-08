import { CustomerService, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import AffilateOrderService from "../../../../../services/affilateOrder";
import { Order } from "../../../../../models/order";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateId = req.params["id"] as string;
        const {from, to} = req.query;

        const options: {from?: Date, to?: Date} = {}
        if (from != null && to != null) {
            options.from = new Date(from as string)
            options.to = new Date(to as string)
        }

        console.log("affiliateId: ", affiliateId);
        const customerService: CustomerService = req.scope.resolve<CustomerService>("customerService");
        const affiliateData = await customerService.retrieve(affiliateId)
        const affilateOrderService = new AffilateOrderService();
        const orders: Order[] = await affilateOrderService.getAffiliateOrder(affiliateData.affiliate_code, options)
        return res.json(orders);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

