import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import { Payout } from "../models/payout"

export const PayoutRepository = dataSource
    .getRepository(Payout)