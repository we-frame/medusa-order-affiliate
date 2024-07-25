import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import {generateEntityId} from "@medusajs/medusa/dist/utils"
import {Customer} from "@medusajs/medusa/dist/models"

@Entity()
export class Affiliate extends BaseEntity {
    @Column({ type: "varchar"})
    code: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({type: "decimal"})
    commission: Number;

    @Column({type: "jsonb"})
    metadata: any | null

    // @ManyToOne(() => Customer, customer => customer.id)
    // @JoinColumn({name: "customer_id"})
    // customer_created: Customer;

    // @PrimaryGeneratedColumn()
    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "affiliate")
    }
}

// npx typeorm migration:generate -d datasource.js src/migrations/affiliateCreate
// npx medusa migrations run