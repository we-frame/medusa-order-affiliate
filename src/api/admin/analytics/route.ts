import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import AffiliateService from "../../../services/affiliate";
import AnalyticsService from "../../../services/analytics";
import { fileURLToPath } from "url";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const analyticsService:AnalyticsService = req.scope.resolve<AnalyticsService>("analyticsService")
        // total_sales
        // affiliate_earning
        // average_sales

        const fieldsToFetch:string[] = [];
        const fields = req.query["fields"] as string;
        if (fields != null) {
            const f = fields.split(",")
            fieldsToFetch.push(...f)
        } else {
            fieldsToFetch.push("*")
        }

        let response: {total_sales?: number, affiliate_earning?: number, average_sales?: number};

        if (fieldsToFetch.includes("*")) {
            response = {
                total_sales: await analyticsService.getTotalSales(),
                affiliate_earning: await analyticsService.getAffiliateEarning(),
                average_sales: await analyticsService.getAverageSales()
            }
        } else {
            response = {};
            if (fieldsToFetch.includes("total_sales")) {
                response.total_sales = await analyticsService.getTotalSales();
            } else if (fieldsToFetch.includes("affiliate_earning")) {
                response.affiliate_earning = await analyticsService.getAffiliateEarning();
            } else if (fieldsToFetch.includes("average_sales")) {
                response.average_sales = await analyticsService.getAverageSales();
            } else {
                res.status(400).send("bad field argument")
            }
        }
        res.json(200).send(response);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

