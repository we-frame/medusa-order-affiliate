import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import {generateEntityId} from "@medusajs/medusa/dist/utils"

@Entity()
export class AffiliateLog extends BaseEntity {
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

    @Column({type: "varchar"})
    customer_id: string

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