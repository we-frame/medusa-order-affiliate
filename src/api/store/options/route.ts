import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import AnalyticsService from "../../../services/analytics";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const analyticsService: AnalyticsService = req.scope.resolve<AnalyticsService>("analyticsService");
        const options = analyticsService.getPluginOptions();
        res.status(200).send(options)
    } catch (error) {
        return res.status(400).send(error.message);
    }
}