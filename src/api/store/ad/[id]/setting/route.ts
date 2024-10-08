import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import CustomcusService from "../../../../../services/customcus";

type UpdateCustomerInput = {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    affiliate_code?: string;
    total_sales?: number;
    commission?: number;
    affiliate_status?: string;
    last_login?: Date;
    affiliate_verified_on?: Date;
    is_affiliate?: boolean;
    affiliate_order_count?: number;
    paypal_email?: string;
};

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateId = req.params["id"] as string;
        const customerService: CustomcusService = req.scope.resolve<CustomcusService>("customcusService");
        
        const requestBody: UpdateCustomerInput = req.body;

        const updatedCustomer = await customerService.update(affiliateId, requestBody)
        return res.status(200).send(updatedCustomer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}

