import { ScheduledJobArgs, ScheduledJobConfig } from "@medusajs/medusa";
import PayoutService from "../services/payout";
import AffilateOrderService from "../services/affilateOrder";
import CustomcusService from "../services/customcus";
import { CLIENT_ID, CLIENT_SECRET } from "../admin/utils/pyapalcreds";
import axios, { AxiosError } from "axios";
import { Payout } from "../models/payout";
import { Order } from "../models/order";
import { v4 as uuidv4 } from 'uuid';

const BASE_API_URL: string = "https://api-m.sandbox.paypal.com"

export default async function handler({ container, data, pluginOptions }: ScheduledJobArgs) {
    try {
        const customerService: CustomcusService = container.resolve<CustomcusService>("customcusService");
        const payoutService: PayoutService = container.resolve<PayoutService>("payoutService");
        const affiliateOrderService: AffilateOrderService = new AffilateOrderService()
        const orders = await affiliateOrderService.getPayoutEligibleOrders()
        
        const data = new URLSearchParams()
        data.append("grant_type", "client_credentials")
        data.append("ignoreCache", "true")
        data.append("return_authn_schemes", "true")
        data.append("return_client_metadata", "true")
        data.append("return_unconsented_scopes", "true")

        const clientId = (pluginOptions["paypal_client_id"] != null) ? pluginOptions["paypal_client_id"] : CLIENT_ID;
        const clientSecret = (pluginOptions["paypal_client_secret"] != null) ? pluginOptions["paypal_client_secret"] : CLIENT_SECRET;
        const basePath = (pluginOptions["paypal_api_url"] != null) ? pluginOptions["paypal_api_url"] : BASE_API_URL;

        const bufClientId = Buffer.from(clientId + ":" + clientSecret)
        const authorizationToken1:string = 'Basic ' + bufClientId.toString("base64")

        const tokenRequestConfig = {
            method: "POST",
            url: `${basePath}/v1/oauth2/token`,
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": authorizationToken1
            },
            data: data
        }
        
        const tokenResponse = await axios.request(tokenRequestConfig)
        for (const order of orders) {
            const customerData = await customerService.retriveByAffiliateCode(order.code_used)
            
            if (tokenResponse.status == 200) {
                const uID = uuidv4()
                const payoutRequestConfig = {
                    method: "POST",
                    url: `${basePath}/v1/payments/payouts`,
                    maxContentLength: Infinity,
                    headers: {
                        "Content-Type": "application/json",
                        "PayPal-Request-Id": `request-id_${uID}`,
                        "Authorization": `Bearer ${tokenResponse.data.access_token}`
                    },
                    data: JSON.stringify({
                        "sender_batch_header": {
                            "sender_batch_id": `batch-id_${uID}`,
                            "recipient_type": "EMAIL",
                            "email_subject": "You have money!",
                            "email_message": "You received a payment. Thanks for using Pilotinstitute!"
                        },
                        "items": [
                            {
                                "amount": {
                                    "value": `${order.commission}`,
                                    "currency": "USD"
                                },
                                "sender_item_id": `item-id_${uID}_1`,
                                "recipient_wallet": "PAYPAL",
                                "receiver": customerData
                            }
                        ]
                    })
                }            
                
                axios.request(payoutRequestConfig)
                .then( async (payoutResponse) => {
                    console.log("payout response status : ", payoutResponse.status);
                    
                    if (payoutResponse.status == 201) {
                        console.log(payoutResponse.data);
                        
                        try {
                            const orderUpdate: Order = new Order()
                            orderUpdate.id = order.id;
                            orderUpdate.payout_status = payoutResponse.data.batch_header.batch_status;
                            orderUpdate.payout_link = payoutResponse.data.links[0].href
                            orderUpdate.payout_created_on = new Date()
            
                            await affiliateOrderService.updateAffiliateOrder(orderUpdate)
                            const newPayout: Payout = new Payout()
                            newPayout.amount = order.commission;
                            newPayout.created_at = new Date()
                            newPayout.customer_id = customerData[0].id;
                            newPayout.order_id = order.id;
                            newPayout.paypal_email = customerData[0].paypal_email;
                            newPayout.status = payoutResponse.data.batch_header.batch_status;
                            newPayout.paypal_payout_link = payoutResponse.data.links[0].href;
                            newPayout.metadata = {}
                            const payoutData = await payoutService.create(newPayout)
            
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
                .catch((error: AxiosError) => {
                    try {
                        console.log("Payout Request Error: ", error.response.data);
                    } catch (error) {
                        console.log("Payout Request Error: ", error);
                    }
                })
            }
        }    
    } catch (error) {
        console.log("[SCHEDULAR] => error: ", error.message);
    }
}

export const config: ScheduledJobConfig = {
    name: "create-payout-every-month",
    schedule: "0 0 1 * *",
    data: {},
}
