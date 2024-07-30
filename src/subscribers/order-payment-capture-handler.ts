import { Customer, Order, OrderService, SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import CustomcusService from "../services/customcus";
import {UpdateOrderInput} from "@medusajs/medusa/dist/types/orders"

export default async function orderPaymentCaptureHandler({data, eventName, container, pluginOptions}: SubscriberArgs<Record<string, any>>) {
    console.log("eventName: ", eventName);
    
    if (eventName == "order.payment_captured") {
        console.log("====================== Order Payment Handler Subscriber Fired =================");
        console.log("data: ", data);

        const {id} = data;
        const orderService:OrderService = container.resolve("orderService");
        
        const orderData: Order = await orderService.retrieve(id, {relations: ["cart"]});
        if (orderData.cart != null) {
            const metadata = orderData.cart.metadata;
            if (metadata.affiliate_code != null) {
                const customCustomerService:CustomcusService = container.resolve("customcusService");
                const customersData: Customer[] = await customCustomerService.retriveByAffiliateCode(metadata?.affiliate_code as string)
                if (customersData.length == 1) {
                    const customerData = customersData[0];
                    const commission = customerData.commission;
                    const calculatedCommission = (commission/100) * orderData.cart.total;

                    const orderUpdate = new Order()
                    orderUpdate.code_used = metadata.affiliate_code as string;
                    orderUpdate.commission = calculatedCommission;
                    orderUpdate.commission_rate = commission;

                    const updateOrder = {
                        code_used: metadata.affiliate_code as string,
                        commission: calculatedCommission,
                        commission_rate: commission
                    }

                    await orderService.update(id, updateOrder as UpdateOrderInput)
                    const customerUpdate = new Customer()
                    customerUpdate.total_sales = customerData.total_sales + calculatedCommission
                    await customCustomerService.update(customerData.id, customerUpdate)
                } else {
                    console.log(`WARN: No Customer Found For Affiliate Code: ${metadata.affiliate_code}`);   
                }
            }
        }
    }
}

export const config: SubscriberConfig = {
    event: OrderService.Events.PAYMENT_CAPTURED,
    context: {
        subscriberId: "order-payment-capture-handler"
    }
}