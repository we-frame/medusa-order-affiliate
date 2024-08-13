import {
    CustomerService,
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/medusa";
import CustomcusService from "../../../services/customcus";
import { CreateCustomerInput } from "@medusajs/medusa/dist/types/customers";
import AffiliateService from "../../../services/affiliate";
import { AffiliateLog } from "../../../models/affiliate";
import { Customer } from "../../../models/customer";
  
export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const customerService: CustomcusService = req.scope.resolve<CustomcusService>("customcusService");
        const response: Customer = await customerService.getAffiliateByCustomer()
        return res.json(response);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateService: AffiliateService = req.scope.resolve<AffiliateService>("affiliateService");
        const customerService: CustomerService = req.scope.resolve<CustomerService>("customerService");
        const requestBody: CreateCustomerInput = (req.body as any) as CreateCustomerInput;
        // const {id, first_name, last_name} = data;

        let staticPart:string;
        if (requestBody.first_name != null) {
            staticPart = requestBody.first_name[0]
        } else if (requestBody.last_name != null) {
            staticPart = requestBody.last_name[0]
        } else {
            staticPart = "P"
        }

        console.log("staticPart: ", staticPart);
        
        var maxRetries: number = 5;
        var validCodeFound: boolean = false;
        let tempCode: string;
        let code: string;

        for (var i=0; i<maxRetries && !validCodeFound; i++) {
            code = generateRandomString(staticPart.toLocaleLowerCase())
            console.log("internal code: ", code);
            if (tempCode == code) {
                tempCode = code;
                continue
            } else {
                const result = await affiliateService.checkCodeAwailability(code)
                if (result) {
                    validCodeFound = true;
                    break
                } else {
                    continue
                }
            }
        }

        if (code != null) {
            const createdCustomer = await customerService.create(requestBody);
            const newAffiliate = new AffiliateLog();
            newAffiliate.code = code;
            newAffiliate.commission = 20;
            newAffiliate.metadata = {customer_id: createdCustomer.id};
            
            const createdAffiliate = await affiliateService.create(code, 20, createdCustomer.id, {})
            console.log("createdAffiliate: ", createdAffiliate);

            const customer = new Customer()
            customer.is_affiliate = true;
            customer.affiliate_code = code;
            customer.commission = 20;
            
            const updatedCustomer = await customerService.update(createdCustomer.id, customer)
            console.log("updatedCustomer: ", updatedCustomer);
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