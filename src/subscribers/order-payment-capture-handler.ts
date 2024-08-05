import { Customer, Order, OrderService, SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import CustomcusService from "../services/customcus";
import {UpdateOrderInput} from "@medusajs/medusa/dist/types/orders"

export default async function orderPaymentCaptureHandler({data, eventName, container, pluginOptions}: SubscriberArgs<Record<string, any>>) {
    
    if (eventName == "order.payment_captured") {
        console.log("====================== Order Payment Handler Subscriber Fired =================");

        const {id} = data;
        const orderService:OrderService = container.resolve("orderService");
        
        const orderData: Order = await orderService.retrieve(id, {relations: ["cart", "cart.payment"]});
        console.log("orderData: ", orderData);
        
        if (orderData.cart != null) {
            const metadata = orderData.cart.metadata;
            if (metadata.affiliate_code != null) {
                const customCustomerService:CustomcusService = container.resolve("customcusService");
                const customersData: Customer[] = await customCustomerService.retriveByAffiliateCode(metadata?.affiliate_code as string)
                console.log("customer: ", customersData );
                
                if (customersData.length == 1) {
                    const customerData = customersData[0];
                    const commission = customerData.commission;
                    var calculatedCommission: number = (commission/100) * (orderData.cart.payment.amount/100);

                    const orderUpdate = new Order()
                    orderUpdate.code_used = metadata.affiliate_code as string;
                    orderUpdate.commission = calculatedCommission;
                    orderUpdate.commission_rate = commission;

                    calculatedCommission = (calculatedCommission != null) ? parseFloat(calculatedCommission.toPrecision(2)) : 0.0

                    const updateOrder = {
                        code_used: metadata.affiliate_code as string,
                        commission: calculatedCommission,
                        commission_rate: commission ?? 0
                    }

                    console.log("updateOrder: ", updateOrder);
                    
                    const updatedOrder = await orderService.update(id, updateOrder as UpdateOrderInput)
                    console.log("updatedOrder: ", updatedOrder);
                    
                    const customerUpdate = new Customer()
                    const customerTotalSales = customerData.total_sales + calculatedCommission;
                    console.log("customerTotalSales: ", customerTotalSales);
                    
                    customerUpdate.total_sales = customerTotalSales
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