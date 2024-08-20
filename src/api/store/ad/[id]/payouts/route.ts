import { CustomerService, MedusaRequest, MedusaResponse, OrderService } from "@medusajs/medusa";
import PayoutService from "../../../../../services/payout";
import axios, { AxiosError } from "axios";
// import { CLIENT_ID, CLIENT_SECRET } from "../../../../../admin/utils/pyapalcreds";
import { v4 as uuidv4 } from 'uuid';
import { Order } from "../../../../../models/order";
import AffilateOrderService from "../../../../../services/affilateOrder";
import { Payout } from "../../../../../models/payout";

const BASE_API_URL: string = "https://api-m.sandbox.paypal.com"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateId = req.params["id"] as string;
        const {from, to, offset, limit} = req.query;

        const options: {from?: Date, to?: Date, offset?: number, limit?: number} = {}
        if (from != null && to != null) {
            options.from = new Date(from as string)
            options.to = new Date(to as string)
        }

        if (offset != null && limit != null) {
            options.offset = parseInt(offset.toString());
            options.limit = parseInt(limit.toString());
        }

        console.log("affiliateId: ", affiliateId);
        const payoutService: PayoutService = req.scope.resolve<PayoutService>("payoutService");
        console.log("================");
        const payoutData = await payoutService.retrieveAll(affiliateId, options)
        return res.json(payoutData);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

interface CreatePayoutRequestBody {
    order_id?: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
        const affiliateId = req.params["id"] as string;
        const requestBody: CreatePayoutRequestBody = req.body;
        if (requestBody.order_id == null) {
            return res.status(400).send({
                "error": "field order_id is required"
            })
        }

        const customerService: CustomerService = req.scope.resolve<CustomerService>("customerService");
        const orderService: OrderService = req.scope.resolve<OrderService>("orderService");
        const payoutService: PayoutService = req.scope.resolve<PayoutService>("payoutService");

        const affiliateOrderService: AffilateOrderService = new AffilateOrderService()

        const affiliateCustomerData = await customerService.retrieve(affiliateId)
        const orderData = await orderService.retrieve(requestBody.order_id)

        if (orderData.code_used == null || orderData.commission == null) {
            return res.status(400).send({
                error: "order is not eligible for payout"
            })
        }

        if (affiliateCustomerData.paypal_email == null) {
            return res.status(400).send({
                error: "paypal payout email is not setup for this affilite customer"
            })
        }

        if (orderData.payout_status != null && orderData.payout_status != "FAILED") {
            const payoutData = await payoutService.retrieveByOrder(orderData.id)
            if (payoutData.length > 0) {
                return res.status(400).send({
                    error: "payout is already initiated for this order",
                    data: payoutData[0]
                })
            } 
            // else {
            //     return res.status(400).send({
            //         error: "something went wrong",
            //     })
            // }
        }

        const data = new URLSearchParams()
        data.append("grant_type", "client_credentials")
        data.append("ignoreCache", "true")
        data.append("return_authn_schemes", "true")
        data.append("return_client_metadata", "true")
        data.append("return_unconsented_scopes", "true")

        const pluginOptions = payoutService.getPluginOptions()
        const clientId = (pluginOptions["paypal_client_id"] != null) ? pluginOptions["paypal_client_id"] : "";
        const clientSecret = (pluginOptions["paypal_client_secret"] != null) ? pluginOptions["paypal_client_secret"] : "";
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
                                "value": `${orderData.commission}`,
                                "currency": "USD"
                            },
                            "sender_item_id": `item-id_${uID}_1`,
                            "recipient_wallet": "PAYPAL",
                            "receiver": affiliateCustomerData.paypal_email
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
                        orderUpdate.id = requestBody.order_id;
                        orderUpdate.payout_status = payoutResponse.data.batch_header.batch_status;
                        orderUpdate.payout_link = payoutResponse.data.links[0].href
                        orderUpdate.payout_created_on = new Date()

                        await affiliateOrderService.updateAffiliateOrder(orderUpdate)
                        const newPayout: Payout = new Payout()
                        newPayout.amount = orderData.commission;
                        newPayout.created_at = new Date()
                        newPayout.customer_id = affiliateId;
                        newPayout.order_id = requestBody.order_id;
                        newPayout.paypal_email = affiliateCustomerData.paypal_email;
                        newPayout.status = payoutResponse.data.batch_header.batch_status;
                        newPayout.paypal_payout_link = payoutResponse.data.links[0].href;
                        newPayout.metadata = {}
                        const payoutData = await payoutService.create(newPayout)

                        return res.status(200).send(payoutData)
                    } catch (error) {
                        console.log(error);
                        return res.status(200).send({
                            error: error.message
                        })
                    }
                } else {                    
                    return res.status(400).send(payoutResponse.data)
                }
            })
            .catch((error: AxiosError) => {
                try {
                    console.log("Payout Request Error: ", error.response.data);
                } catch (error) {
                    console.log("Payout Request Error: ", error);
                }
                return res.status(400).send(error)
            })
        } else {
            return res.status(400).send({error: "error while authorization", message: tokenResponse.data})
        }
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
    
}
 
