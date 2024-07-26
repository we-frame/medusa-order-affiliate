import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import AffiliateService from "../../../services/affiliate";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const affiliateService = req.scope.resolve<AffiliateService>("affiliateService")
    const affiliate_ids = req.query["ids"] as string;
    const affiliateIds = affiliate_ids.split(",")
    const affiliateData = await affiliateService.fetchMultipleByIds(affiliateIds)
    console.log("affiliate_ids: ", affiliateIds);
    res.json(affiliateData)
}