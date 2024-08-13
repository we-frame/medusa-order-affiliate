import { MedusaContainer, TransactionBaseService } from "@medusajs/medusa";
import { Between, FindOptionsWhere, In } from "typeorm";
import { PayoutRepository } from "../repositories/payout";
import { Payout } from "../models/payout";

class PayoutService extends TransactionBaseService {
    protected payoutRepository_: typeof PayoutRepository
    private options: Record<string,any>;

    constructor(container, options) {
        super(container)
        this.payoutRepository_ = container.payoutRepository;
        this.options = options;
    }

    public getPluginOptions(): Record<string,any> {
        return this.options;
    }
    
    async retrieveAll(customerId: string, options?: {from?: Date, to?: Date, offset?: number, limit?: number}): Promise<Payout[]> {
        const payoutRepo = this.activeManager_.withRepository(this.payoutRepository_)
        const where: FindOptionsWhere<Payout> = {
            customer_id: customerId
        };
        if (options.from != null && options.to != null) {
            where.created_at = Between(options.from, options.to)
        }
        const payouts = await payoutRepo.find({
            where: where,
            skip: options.offset,
            take: options.limit
        })
        return payouts;
    }

    async update(payout: Payout): Promise<Payout> {
        const payoutRepo = this.activeManager_.withRepository(this.payoutRepository_)
        return await payoutRepo.save(payout)
    }
    
    async retrieveByOrder(orderId: string): Promise<Payout[]> {
        const payoutRepo = this.activeManager_.withRepository(this.payoutRepository_)
        const payouts: Payout[] = await payoutRepo.findBy({
            order_id: orderId
        })
        return payouts
    }

    async retrievePending(): Promise<Payout[]> {
        const payoutRepo = this.activeManager_.withRepository(this.payoutRepository_)
        const payouts: Payout[] = await payoutRepo.findBy({
            status: "PENDING"
        })
        return payouts
    }
    
    async create(payout: Payout): Promise<Payout> {
        const payoutRepo = this.activeManager_.withRepository(this.payoutRepository_)
        return await payoutRepo.save(payout)
    }
}

export default PayoutService;