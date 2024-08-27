import { PaymentStatus } from "@medusajs/medusa";
import { Order } from "../models/order";
import { AffiliateOrderRepository } from "../repositories/affiliateOrder";
import { Between, FindOptionsWhere, IsNull, LessThanOrEqual, MoreThan, Not, Repository } from "typeorm";

class AffilateOrderService {
  private affiliateOrderRepository: Repository<Order>;
  // private options: Record<string,any>;

  constructor() {
    this.affiliateOrderRepository = AffiliateOrderRepository;
    // this.options = options;
  }

  public async getAffilateOrderById(id: string): Promise<Order> {
    return this.affiliateOrderRepository.findOne({ where: { id } });
  }

  public async updateAffiliateOrder(order: Order): Promise<Order> {
    return await this.affiliateOrderRepository.save(order)
    // const updatedOrder = await this.affiliateOrderRepository.update(id, order)
  }

  public async getPayoutEligibleOrders(): Promise<Order[]> {
    return await this.affiliateOrderRepository.findBy({
      refunds: IsNull(),
      payout_status: IsNull(),
      code_used: Not(IsNull()),
      commission: Not(IsNull())
    })
  }

  // public getPluginOptions(): Record<string,any> {
  //   return this.options;
  // }

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
