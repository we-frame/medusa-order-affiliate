import { Customer, CustomerService, SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"
import AffiliateService from "../services/affiliate";
import { AffiliateLog } from "../models/affiliate";

export default async function customerCreateHandler({data, eventName, container, pluginOptions}: SubscriberArgs<Record<string, any>>) {

    if (eventName == "customer.created") {
        // console.log("============= customer created subscriber fired =================");
        // console.log("data: ", data);

        const affiliateService: AffiliateService = container.resolve("affiliateService")
        const customerService: CustomerService = container.resolve("customerService")

        const {id, first_name, last_name} = data;

        let staticPart:string;
        if (first_name != null) {
            staticPart = first_name[0]
        } else if (last_name != null) {
            staticPart = last_name[0]
        } else {
            staticPart = "P"
        }

        // console.log("staticPart: ", staticPart);
        
        var maxRetries: number = 5;
        var validCodeFound: boolean = false;
        let tempCode: string;
        let code: string;

        for (var i=0; i<maxRetries && !validCodeFound; i++) {
            code = generateRandomString(staticPart.toLocaleLowerCase())
            // console.log("internal code: ", code);
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
            const newAffiliate = new AffiliateLog();
            newAffiliate.code = code;
            newAffiliate.commission = 20;
            newAffiliate.metadata = {customer_id: id};
            
            const createdAffiliate = await affiliateService.create(code, 20, id, {})
            // console.log("createdAffiliate: ", createdAffiliate);

            const customer = new Customer()
            customer.affiliate_code = code;
            customer.commission = 20;
            
            const updatedCustomer = await customerService.update(id, customer)
            // console.log("updatedCustomer: ", updatedCustomer);
            
        } else {
            console.log("[ERRPR] [CUSTOMER CREATE SUBSCRIBER] => code is null");
        }
    }


}

export const config: SubscriberConfig = {
    event: CustomerService.Events.CREATED,
    context: {
        subscriberId: "customer-create-handler"
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