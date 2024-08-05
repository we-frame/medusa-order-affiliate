// services/order.ts
import { AffiliateOrderRepository } from "../repositories/affiliateOrder";
import { Order } from "../models/order";

class AffilateOrderService {
  private affiliateOrderRepository: typeof AffiliateOrderRepository;

  constructor(container) {
    this.affiliateOrderRepository = container.affiliateOrderRepository;
  }

  public async getAffilateOrderById(id: string): Promise<Order> {
    return this.affiliateOrderRepository.findOne({ where: { id } });
  }

  // other methods...
}

export default AffilateOrderService;