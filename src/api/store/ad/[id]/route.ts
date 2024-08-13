import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import CustomcusService from "../../../../services/customcus";
import { Customer } from "../../../../models/customer";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateId = req.params["id"] as string;
        const customerService: CustomcusService = req.scope.resolve<CustomcusService>("customcusService");
        const response: Customer = await customerService.retrieve(affiliateId)
        return res.json(response);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateId = req.params["id"] as string;
        const customerService: CustomcusService = req.scope.resolve<CustomcusService>("customcusService");
        
        const requestBody: any = req.body;
        const updatedCustomer = await customerService.update(affiliateId, requestBody)
        return res.status(200).send(updatedCustomer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}

