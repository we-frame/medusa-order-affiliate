import { MedusaContainer, TransactionBaseService } from "@medusajs/medusa";
import {AffiliateLog} from "../models/affiliate"
import { AffiliateRepository } from "../repositories/affiliate";
import { In } from "typeorm";

class AffiliateService extends TransactionBaseService {
    protected affiliateRepository_: typeof AffiliateRepository
    private options: Record<string,any>;

    constructor(container, options) {
        super(container)
        this.affiliateRepository_ = container.affiliateRepository;
        this.options = options;
    }

    async create(code: string, commission: number, customer_id: string, metadata: any): Promise<AffiliateLog> {
        const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
        const affiliate = new AffiliateLog()
        affiliate.code = code;
        affiliate.commission = commission;
        affiliate.customer_id = customer_id;
        affiliate.metadata = metadata;
        affiliate.created_at = new Date();
        // affiliate.updated_at = null;

        console.log("affiliate: ", affiliate);
        
        return affiliateRepo.save(affiliate)

        // return affiliateRepo.create(data);
    }

    public getPluginOptions(): Record<string,any> {
        return this.options;
    }
    
    async fetchByCustomer(customer_id: string): Promise<AffiliateLog[]> {
        const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
        return affiliateRepo.find({
            where: {
                metadata: {
                    customer_id: customer_id
                }
            }
        })
    }

    async fetchMultipleByIds(ids: string[]): Promise<AffiliateLog[]> {
        const affiliateRepo = this.activeManager_.withRepository(this.affiliateRepository_)
        return affiliateRepo.findBy({id: In(ids)})
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