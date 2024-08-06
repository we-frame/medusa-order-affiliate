import { CustomerService, PaymentStatus } from "@medusajs/medusa";
import CustomerRepository from "@medusajs/medusa/dist/repositories/customer";
import { IsNull, Not } from "typeorm";
import { Customer } from "../models/customer";

class CustomcusService extends CustomerService {
    protected customerRepository_: typeof CustomerRepository

    constructor(container) {
        super(container)
        this.customerRepository_ = container.customerRepository;
    }

    async retriveByAffiliateCode(affiliateCode:string): Promise<Customer[]> {
        const customerRepo = this.activeManager_.withRepository(this.customerRepository_)
        return await customerRepo.findBy({
            affiliate_code: affiliateCode
        })
    }
    
    async getAffiliateByCustomer(): Promise<Customer[]>  {
        const customerRepo = this.activeManager_.withRepository(this.customerRepository_)
        return await customerRepo.findBy({
            affiliate_code: Not(IsNull())
        })
    }
    
    async updateCustomer(customerId: string, data: Customer): Promise<Customer> {
        const customerRepo = this.activeManager_.withRepository(this.customerRepository_)
        const update = await customerRepo.save(data)
        return update;
    }
}

export default CustomcusService;