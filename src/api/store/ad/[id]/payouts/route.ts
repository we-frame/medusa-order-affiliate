import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PayoutService from "../../../../../services/payout";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateId = req.params["id"] as string;
        const {from, to, offset, limit} = req.query;

        const options: {from?: Date, to?: Date, offset?: number, limit?: number} = {}
        if (from != null && to != null) {
            options.from = new Date(from as string)
            options.to = new Date(to as string)
        }

        if (offset != null && limit != null) {
            options.offset = parseInt(offset.toString());
            options.limit = parseInt(limit.toString());
        }

        console.log("affiliateId: ", affiliateId);
        const payoutService: PayoutService = req.scope.resolve<PayoutService>("payoutService");
        console.log("================");
        const payoutData = await payoutService.retrieveAll(affiliateId, options)
        return res.json(payoutData);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

