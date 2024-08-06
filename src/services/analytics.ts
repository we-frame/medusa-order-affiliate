import { Order, OrderService, Payment, PaymentStatus } from "@medusajs/medusa";
import {OrderRepository} from "@medusajs/medusa/dist/repositories/order";
import { IsNull, Not } from "typeorm";

class AnalyticsService extends OrderService {
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

    async getOrders(): Promise<Order[]> {
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        return await customOrderRepo.find({
            where: {
                code_used: Not(IsNull()),
                payment_status: PaymentStatus.CAPTURED
            },
            relations: ["payments"]
        })
    }
    
    async getTotalSales(): Promise<number>{
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const orders: Order[]= await customOrderRepo.find({
            where: {
                code_used: Not(IsNull()),
                payment_status: PaymentStatus.CAPTURED
            },
            relations: ["payments"],
            // select: ["total"]
        })

        var orderTotalSales: number = 0
        orders.forEach((order: Order) => {
            var total:number = 0;
            if (order.payments != null) {
                order.payments.forEach((payment: Payment) => total += (payment.amount/ 100))
            }
            orderTotalSales += total;
        })
        const sres = orderTotalSales.toFixed(2)
        return parseFloat(sres);
    }
    
    async getAffiliateEarning(): Promise<number>{
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const orders: Order[]= await customOrderRepo.find({
            where: {
                code_used: Not(IsNull()),
                payment_status: PaymentStatus.CAPTURED
            },
            // select: ["commission"]
        })

        var orderAffiliateEarning:number = 0;
        orders.forEach((order: Order) => {
            let v: number;
            try {
                const commission: number = order.commission;
                if (!isNaN(commission)) {
                    v = parseFloat(commission.toString())
                } else {
                    v = 0
                }
            } catch (error) {
                v = 0
            }
            orderAffiliateEarning += v;
        })
        const sres = orderAffiliateEarning.toFixed(2)
        return parseFloat(sres);
    }
    
    async getAverageSales(): Promise<number>{
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const orders: Order[]= await customOrderRepo.find({
            where: {
                code_used: Not(IsNull()),
                payment_status: PaymentStatus.CAPTURED
            },
            relations: ["payments"],
            // select: ["total"]
        })

        var orderTotalSales: number = 0
        orders.forEach((order: Order) => {

            var total:number = 0;
            if (order.payments != null) {
                order.payments.forEach((payment: Payment) => total += (payment.amount/ 100))
            }
            orderTotalSales += total;
        })

        const average = orderTotalSales / orders.length;
        const sres = average.toFixed(2)
        return parseFloat(sres);
    }
}

export default AnalyticsService;