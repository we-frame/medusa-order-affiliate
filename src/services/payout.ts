import { MedusaContainer, TransactionBaseService } from "@medusajs/medusa";
import { Between, FindOptionsWhere, In } from "typeorm";
import { PayoutRepository } from "../repositories/payout";
import { Payout } from "../models/payout";

class PayoutService extends TransactionBaseService {
    protected payoutRepository_: typeof PayoutRepository

    constructor(container) {
        super(container)
        this.payoutRepository_ = container.payoutRepository;
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
}

export default PayoutService;