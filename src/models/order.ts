import { Column, Entity } from "typeorm";
import {Order as MedusaOrder} from "@medusajs/medusa/dist/models";

@Entity()
export class Order extends MedusaOrder {
    @Column({type: "varchar"})
    code_used: string

    @Column({type: "decimal"})
    commission: number

    @Column({type: "decimal"})
    commission_rate: number

    @Column({type: "timestamp"})
    commission_created_on: Date

    @Column({type: "boolean"})
    payout_done: boolean
}
