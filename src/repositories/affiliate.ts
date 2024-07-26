import {AffiliateLog} from "../models/affiliate"
import { dataSource } from "@medusajs/medusa/dist/loaders/database"

export const AffiliateRepository = dataSource
    .getRepository(AffiliateLog)