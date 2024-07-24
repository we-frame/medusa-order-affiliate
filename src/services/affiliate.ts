import { MedusaContainer, TransactionBaseService } from "@medusajs/medusa";
import {Affiliate} from "../models/affiliate"
import { AffiliateRepository } from "../repositories/affiliate";

class AffiliateService extends TransactionBaseService {
    protected affiliateRepository_: typeof AffiliateRepository

    constructor(container: MedusaContainer) {
        super(container)
        // this.affiliateRepository_ = container.;
    }

    async create(data: Affiliate): Promise<Affiliate> {
        const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
        return affiliateRepo.create(data);
    }
    
    async fetchByCustomer(customer_id: string): Promise<Affiliate[]> {
        const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
        return affiliateRepo.find({
            where: {
                metadata: {
                    customer_id: customer_id
                }
            }
        })
    }
    
    async checkCodeAwailability(code: string): Promise<boolean> {
        const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
        const affiliate = await affiliateRepo.findOne({
            where: {
                code: code
            }
        })

        if (affiliate != null) {
            return false
        } else {
            return true
        }
    }
}

export default AffiliateService;