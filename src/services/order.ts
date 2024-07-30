import { Order, OrderService, PaymentStatus } from "@medusajs/medusa";
import {OrderRepository} from "@medusajs/medusa/dist/repositories/order";

class CustomOrderService extends OrderService {
    protected orderRepository_: typeof OrderRepository

    constructor(container) {
        super(container)
        this.orderRepository_ = container.orderRepository;
    }

    async markOrderPaymentAsCaptured(id: string): Promise<Order> {
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const order = new Order()
        order.id = id;
        order.payment_status = PaymentStatus.CAPTURED;
        return await customOrderRepo.save(order)
    }
}

export default CustomOrderService;