import { Column, Entity } from "typeorm";
import {Customer as MedusaCustomer} from "@medusajs/medusa/dist/models"

@Entity()
export class Customer extends MedusaCustomer {
    @Column({type: "varchar"})
    affiliate_code: string

    @Column({type: "decimal"})
    total_sales: number

    @Column({type: "decimal"})
    commission: number

    @Column({type: "varchar"})
    affiliate_status: string

    @Column({type: "boolean"})
    is_affiliate: boolean;

    @Column({type: "int8"})
    affiliate_order_count: number

    @Column({type: "varchar"})
    paypal_email: string
}
