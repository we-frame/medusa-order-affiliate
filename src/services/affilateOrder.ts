import { PaymentStatus } from "@medusajs/medusa";
import { Order } from "../models/order";
import { AffiliateOrderRepository } from "../repositories/affiliateOrder";
import { Between, FindOptionsWhere, Repository } from "typeorm";

class AffilateOrderService {
  private affiliateOrderRepository: Repository<Order>;

  constructor() {
    this.affiliateOrderRepository = AffiliateOrderRepository;
  }

  public async getAffilateOrderById(id: string): Promise<Order> {
    return this.affiliateOrderRepository.findOne({ where: { id } });
  }



  public async getAffiliateOrder(affiliateCode:string, options?:{from?: Date, to?: Date}): Promise<Order[]> {

    const where:FindOptionsWhere<Order> = {
      code_used: affiliateCode,
      payment_status: PaymentStatus.CAPTURED,
    }
    if (options.from != null && options.to != null) {
      where.created_at = Between(options.from, options.to)
    }
    return this.affiliateOrderRepository.find({
      where: where,
      relations: ["items"]
    })
  }
}

export default AffilateOrderService;
