import { CartService, Order, OrderService, SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";

export default async function orderPlacedHandler({data, eventName, container, pluginOptions}: SubscriberArgs<Record<string, any>>) {
    console.log("eventName: ", eventName);
    
    if (eventName == "order.placed") {
        // console.log("====================== Order Placed Subscriber Fired =================");

        const {id} = data;
        const orderService:OrderService = container.resolve("orderService");
        const cartService:CartService = container.resolve("cartService");
        
        const orderData: Order = await orderService.retrieve(id);
        const cartData = await cartService.retrieve(orderData.cart_id, {relations: ["payment"]})
        const paymentData = cartData.payment.data;

        if (paymentData.status == "requires_capture") {
            await orderService.capturePayment(id);
            console.log("======= Payment Capture Succeeded =========================");
        }

        // if (cartData.payment.provider_id == "stripe") {
        //     const paymentData = cartData.payment.data;
        //     if (paymentData.status == "requires_capture") {
        //         await orderService.capturePayment(id);
        //         console.log("======== stripe payment succeeded =========================");
        //     }
        // }
    }
}

export const config: SubscriberConfig = {
    event: OrderService.Events.PLACED,
    context: {
        subscriberId: "order-placed-handler"
    }
}