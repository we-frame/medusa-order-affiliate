import { OrderService, SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";

export default async function orderCompleteHandler({data, eventName, container, pluginOptions}: SubscriberArgs<Record<string, any>>) {
    if (eventName == "order.updated") {
        console.log("====================== Order Complete Subscriber Fired =================");
        console.log("data: ", data);
    }
}

export const config: SubscriberConfig = {
    event: OrderService.Events.COMPLETED,
    context: {
        subscriberId: "order-complete-handler"
    }
}