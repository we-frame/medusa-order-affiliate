import { CustomerService, PaymentStatus } from "@medusajs/medusa";
import CustomerRepository from "@medusajs/medusa/dist/repositories/customer";
import { IsNull, Not } from "typeorm";
import { Customer } from "../models/customer";

class CustomcusService extends CustomerService {
    protected customerRepository_: typeof CustomerRepository
    private options: Record<string,any>;

    constructor(container, options) {
        super(container)
        this.customerRepository_ = container.customerRepository;
        this.options = options;
    }

    public getPluginOptions(): Record<string,any> {
        return this.options;
    }

    async retriveByAffiliateCode(affiliateCode:string): Promise<Customer[]> {
        const customerRepo = this.activeManager_.withRepository(this.customerRepository_)
        return await customerRepo.findBy({
            affiliate_code: affiliateCode
        })
    }
    
    async getAffiliateByCustomer(): Promise<Customer>  {
        const customerRepo = this.activeManager_.withRepository(this.customerRepository_)
        const customers = await customerRepo.findBy({
            affiliate_code: Not(IsNull())
        })

        return customers[0];
    }
    
    async updateCustomer(customerId: string, data: Customer): Promise<Customer> {
        const customerRepo = this.activeManager_.withRepository(this.customerRepository_)
        const update = await customerRepo.save(data)
        return update;
    }
}

export default CustomcusService;