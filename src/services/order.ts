
import OrderRepository from "@medusajs/medusa/dist/repositories/order";
// import { OrderRepository } from "../repositories/order";
import { Order } from "../models/order";
import { OrderService } from "@medusajs/medusa";

export class OrdersService extends OrderService {
  protected orderRepository_: typeof OrderRepository;

  constructor(container) {
    super(container)
    this.orderRepository_ = container.orderRepository;
  }

  public async getOrderById(id: string): Promise<Order> {
    const customerRepo = this.activeManager_.withRepository(this.orderRepository_)
    return customerRepo.findOne({ where: { id } });
  }
}