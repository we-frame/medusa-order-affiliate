import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa/dist/types/routing";
import AffiliateService from "../../../../../services/affiliate";
import CustomerService from "@medusajs/medusa/dist/services/customer";
import { Customer } from "../../../../../models/customer";

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
  try {
    const customerId = req.params["id"] as string;
    const customerUpdate = new Customer();

    const affiliateService: AffiliateService =
      req.scope.resolve<AffiliateService>("affiliateService");
    const customerService: CustomerService =
      req.scope.resolve<CustomerService>("customerService");

    const staticPart: string = "P";

    var maxRetries: number = 5;
    var validCodeFound: boolean = false;
    let tempCode: string;
    let code: string;

    for (var i = 0; i < maxRetries && !validCodeFound; i++) {
      code = generateRandomString(staticPart.toLocaleLowerCase());
      if (tempCode == code) {
        tempCode = code;
        continue;
      } else {
        const result = await affiliateService.checkCodeAwailability(code);
        if (result) {
          validCodeFound = true;
          break;
        } else {
          continue;
        }
      }
    }

    if (code != null) {
      customerUpdate.id = customerId;
      customerUpdate.is_affiliate = true;
      customerUpdate.affiliate_code = code;
      customerUpdate.commission = 20;

      // const createdCustomer = await customerService.create(requestBody);
      const updatedCustomer = await customerService.update(
        customerId,
        customerUpdate
      );
      console.log("updatedCustomer: ", updatedCustomer);

      const createdAffiliate = await affiliateService.create(
        code,
        20,
        customerId,
        {}
      );
      console.log("createdAffiliate: ", createdAffiliate);
      return res.json(updatedCustomer);
    } else {
      console.log("[ERRPR] [CUSTOMER CREATE SUBSCRIBER] => code is null");
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

function generateRandomString(staticPart: string): string {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let randomString = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return `${randomNumber}_${staticPart}_${randomString}`;
}
