import { MedusaContainer, TransactionBaseService } from "@medusajs/medusa";
// import {Affiliate} from "../models/affiliate"
import { AffiliateRepository } from "../repositories/affiliate";
import { In } from "typeorm";

class AffiliateService extends TransactionBaseService {
    protected affiliateRepository_: typeof AffiliateRepository

    constructor(container) {
        super(container)
        this.affiliateRepository_ = container.affiliateRepository;
    }

    // async create(code: string, commission: number, metadata: any): Promise<Affiliate> {
    //     const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
    //     const affiliate = new Affiliate()
    //     affiliate.code = code;
    //     affiliate.commission = commission;
    //     affiliate.metadata = metadata;
    //     affiliate.created_at = new Date();
    //     // affiliate.updated_at = null;

    //     console.log("affiliate: ", affiliate);
        
    //     return affiliateRepo.save(affiliate)

    //     // return affiliateRepo.create(data);
    // }
    
    // async fetchByCustomer(customer_id: string): Promise<Affiliate[]> {
    //     const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
    //     return affiliateRepo.find({
    //         where: {
    //             metadata: {
    //                 customer_id: customer_id
    //             }
    //         }
    //     })
    // }

    // async fetchMultipleByIds(ids: string[]): Promise<Affiliate[]> {
    //     const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
    //     return affiliateRepo.findBy({id: In(ids)})
    // }
    
    // async checkCodeAwailability(code: string): Promise<boolean> {
    //     const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
    //     const affiliate = await affiliateRepo.findOne({
    //         where: {
    //             code: code
    //         }
    //     })

    //     if (affiliate != null) {
    //         return false
    //     } else {
    //         return true
    //     }
    // }
}

export default AffiliateService;