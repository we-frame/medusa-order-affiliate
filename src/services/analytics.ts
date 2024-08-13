import { Order, OrderService, Payment, PaymentStatus, Refund } from "@medusajs/medusa";
import {OrderRepository} from "@medusajs/medusa/dist/repositories/order";
import RefundRepository from "@medusajs/medusa/dist/repositories/refund";
import { FindOperator, FindOptionsWhere, In, IsNull, Not } from "typeorm";

class AnalyticsService extends OrderService {
    protected orderRepository_: typeof OrderRepository
    protected refundRepository_: typeof RefundRepository
    private options:Record<string,any>;

    constructor(container, options) {
        super(container)
        this.orderRepository_ = container.orderRepository;
        this.refundRepository_ = container.refundRepository;
        this.options = options;
    }

    public getPluginOptions(): Record<string,any> {
        return this.options;
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
    
    async getTotalSales(code_used?:string): Promise<number>{
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const where: FindOptionsWhere<Order> = {
            code_used: Not(IsNull()),
            payment_status: PaymentStatus.CAPTURED,
        }
        if (code_used != null) {
            where.code_used = code_used;
        }
        const orders: Order[]= await customOrderRepo.find({
            where: where,
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
    
    async getAffiliateEarning(code_used?:string): Promise<number>{
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const where: FindOptionsWhere<Order> = {
            code_used: Not(IsNull()),
            payment_status: PaymentStatus.CAPTURED,
        }
        if (code_used != null) {
            where.code_used = code_used;
        }
        const orders: Order[]= await customOrderRepo.find({
            where: where,
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
    
    async getAverageSales(code_used?:string): Promise<number>{
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const where: FindOptionsWhere<Order> = {
            code_used: Not(IsNull()),
            payment_status: PaymentStatus.CAPTURED,
        }
        if (code_used != null) {
            where.code_used = code_used;
        }
        const orders: Order[]= await customOrderRepo.find({
            where: where,
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
    
    async getRefundedAmount(code_used?:string): Promise<number> {
        const customOrderRepo = this.activeManager_.withRepository(this.orderRepository_)
        const refundRepo = this.activeManager_.withRepository(this.refundRepository_)

        const where: FindOptionsWhere<Order> = {
            code_used: Not(IsNull()),
            payment_status: In([PaymentStatus.REFUNDED, PaymentStatus.PARTIALLY_REFUNDED]),
        }
        if (code_used != null) {
            where.code_used = code_used;
        }
        const orders: Order[] = await customOrderRepo.find({
            where: where,
            select: ["id"]            
        })

        const orderIds: string[] = orders.map((order: Order) => order.id)

        const refundData = await refundRepo.find({
            where: {
                order_id: In(orderIds)
            },
            select: ["amount"]
        })
        
        var totalRefundedAmount: number = 0;
        refundData.forEach((refund: Refund) => totalRefundedAmount += (refund.amount != null) ? refund.amount / 100 : 0 )
        const sres = totalRefundedAmount.toFixed(2)
        return parseFloat(sres);
    }
}

export default AnalyticsService;