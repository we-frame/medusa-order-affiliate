import { Order } from "../models/order";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const AffiliateOrderRepository = dataSource.getRepository(Order);
