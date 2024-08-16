import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class ExtendCustomer1723709020240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("customer", [
            new TableColumn({
                name: "affiliate_code",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn({
                name: "total_sales",
                type: "decimal",
                precision: 10, 
                scale: 2,
                isNullable: true,
                default: 0,
            }),
            new TableColumn({
                name: "commission",
                type: "decimal",
                precision: 10,
                scale: 2,
                isNullable: true,
                default: 0
            }),
            new TableColumn({
                name: "affiliate_status",
                type: "varchar",
                isNullable: true,
                default: "'pending'"
            }),
            new TableColumn({
                name: "last_login",
                type: "timestamp",
                isNullable: true
            }),
            new TableColumn({
                name: "affiliate_verified_on",
                type: "timestamp",
                isNullable: true
            }),
            new TableColumn({
                name: "is_affiliate",
                type: "boolean",
                isNullable: true
            }),
            new TableColumn({
                name: "affiliate_order_count",
                type: "int8",
                isNullable: true,
                default: 0,
            }),
            new TableColumn({
                name: "paypal_email",
                type: "varchar",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("customer", ["paypal_email","affiliate_order_count","affiliate_status", "commission", "total_sales", "affiliate_code", "last_login","affiliate_verified_on", "is_affiliate"])
    }
}
