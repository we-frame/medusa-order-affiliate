import { BeforeInsert, Column, CreateDateColumn, Entity } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import {generateEntityId} from "@medusajs/medusa/dist/utils"

@Entity()
export class Payout extends BaseEntity {
    @CreateDateColumn()
    created_at: Date;

    @Column({ type: "varchar"})
    order_id: string;

    @Column({type: "decimal"})
    amount: Number;
    
    @Column({type: "varchar"})
    customer_id: string
    
    @Column({type: "varchar"})
    status: string
    
    @Column({type: "varchar"})
    paypal_email: string
    
    @Column({type: "jsonb"})
    metadata: any | null

    @Column({type: "varchar"})
    paypal_payout_link: string | null

    // @PrimaryGeneratedColumn()
    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "affiliate")
    }
}

// npm run build
// npx typeorm migration:generate -d datasource.js src/migrations/<migration-name>
// npm run build
// npx medusa migrations run