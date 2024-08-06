import { Customer, Order, OrderService, SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import CustomcusService from "../services/customcus";
import {UpdateOrderInput} from "@medusajs/medusa/dist/types/orders"

export default async function orderPaymentCaptureHandler({data, eventName, container, pluginOptions}: SubscriberArgs<Record<string, any>>) {
    
    if (eventName == "order.payment_captured") {
        console.log("====================== Order Payment Handler Subscriber Fired =================");

        const {id} = data;
        const orderService:OrderService = container.resolve("orderService");
        
        const orderData: Order = await orderService.retrieve(id, {relations: ["cart", "cart.payment", "customer"]});
        
        if (orderData.cart != null) {
            const metadata = orderData.cart.metadata;
            if (metadata.affiliate_code != null) {
                const customCustomerService:CustomcusService = container.resolve("customcusService");
                const customersData: Customer[] = await customCustomerService.retriveByAffiliateCode(metadata?.affiliate_code as string)
                
                if (customersData.length == 1) {
                    const customerData = customersData[0];
                    if (customerData.affiliate_status == "active") {
                        if (orderData.customer.id != customerData.id) {
                            let affiliateOrderCount: number;
                            if (customerData.affiliate_order_count == null) {
                                affiliateOrderCount = 1
                            } else {
                                affiliateOrderCount = parseInt(customerData.affiliate_order_count.toString()) + 1;
                            }

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
                            
                            await orderService.update(id, updateOrder as UpdateOrderInput)
                            const customerUpdate = new Customer()
                            const customerTotalSales = parseFloat(customerData.total_sales.toString()) + parseFloat(calculatedCommission.toString());
                            
                            customerUpdate.total_sales = customerTotalSales
                            customerUpdate.affiliate_order_count = affiliateOrderCount
                            console.log("updating customer: ", customerUpdate);
                            
                            const updatedCustomer = await customCustomerService.update(customerData.id, customerUpdate)
                            console.log("updatedCustomer: ", updatedCustomer);
                            
                        } else {
                            console.log("[WARN]: self affliate is not possible");
                        }   
                    } else {
                        console.log("[WARN]: affliate status is not active");
                    }
                } else {
                    console.log(`[WARN]: No Customer Found For Affiliate Code: ${metadata.affiliate_code}`);   
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