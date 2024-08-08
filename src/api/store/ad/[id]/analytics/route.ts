import { CustomerService, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import AnalyticsService from "../../../../../services/analytics";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        // total_sales
        // affiliate_earning
        // average_sales
        // refunded_amount
        const analyticsService:AnalyticsService = req.scope.resolve<AnalyticsService>("analyticsService")
        
        const affiliateId = req.params["id"] as string;
        const customerService: CustomerService = req.scope.resolve<CustomerService>("customerService");
        const affiliateData = await customerService.retrieve(affiliateId);

        const fieldsToFetch:string[] = [];
        const fields = req.query["fields"] as string;
        if (fields != null) {
            const f = fields.split(",")
            fieldsToFetch.push(...f)
        } else {
            fieldsToFetch.push("*")
        }

        let response: {total_sales?: number, affiliate_earning?: number, average_sales?: number, refunded_amount?: number};

        if (fieldsToFetch.includes("*")) {
            response = {
                total_sales: await analyticsService.getTotalSales(affiliateData.affiliate_code),
                affiliate_earning: await analyticsService.getAffiliateEarning(affiliateData.affiliate_code),
                average_sales: await analyticsService.getAverageSales(affiliateData.affiliate_code),
                refunded_amount: await analyticsService.getRefundedAmount(affiliateData.affiliate_code)
            }
        } else {
            response = {};
            if (fieldsToFetch.includes("total_sales")) {
                response.total_sales = await analyticsService.getTotalSales(affiliateData.affiliate_code);
            } else if (fieldsToFetch.includes("affiliate_earning")) {
                response.affiliate_earning = await analyticsService.getAffiliateEarning(affiliateData.affiliate_code);
            } else if (fieldsToFetch.includes("average_sales")) {
                response.average_sales = await analyticsService.getAverageSales(affiliateData.affiliate_code);
            } else if (fieldsToFetch.includes("refunded_amount")) {
                response.average_sales = await analyticsService.getRefundedAmount(affiliateData.affiliate_code);
            } else {
                res.status(400).send("bad field argument")
            }
        }
        return res.json(response)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}

