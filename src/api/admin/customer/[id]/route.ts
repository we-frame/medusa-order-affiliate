import {
  Customer,
  CustomerService,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
  try {
    const customerService: CustomerService =
      req.scope.resolve<CustomerService>("customerService");
    const customerId = req.params["id"] as string;
    const requestBody: any = req.body;
    const customerUpdate = new Customer();
    customerUpdate.commission = requestBody.commission as number;
    customerUpdate.affiliate_status = requestBody.affiliate_status as string;

    const updatedCustomer = await customerService.update(
      customerId,
      customerUpdate
    );
    return res.json(updatedCustomer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  try {
    const customerService: CustomerService =
      req.scope.resolve<CustomerService>("customerService");
    const customerId = req.params["id"] as string;
    await customerService.delete(customerId);
    return res.status(200).send({ successMsg: "Affiliate deleted successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}


