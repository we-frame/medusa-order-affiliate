// services/order.ts
import { AffiliateOrderRepository } from "../repositories/affiliateOrder";
import { Order } from "../models/order";
import { Repository } from "typeorm";

class AffilateOrderService {
  private affiliateOrderRepository: Repository<Order>;

  constructor() {
    this.affiliateOrderRepository = AffiliateOrderRepository;
  }

  public async getAffilateOrderById(id: string): Promise<Order> {
    return this.affiliateOrderRepository.findOne({ where: { id } });
  }
}

export default AffilateOrderService;
