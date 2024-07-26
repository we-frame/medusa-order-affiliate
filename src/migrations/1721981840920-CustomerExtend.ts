import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CustomerExtend1721981840920 implements MigrationInterface {

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
                isNullable: true
            }),
            new TableColumn({
                name: "commission",
                type: "decimal",
                precision: 10,
                scale: 2,
                isNullable: true
            }),
            new TableColumn({
                name: "affiliate_status",
                type: "varchar",
                isNullable: true
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("customer", "affiliate_code");
        await queryRunner.dropColumn("customer", "total_sales");
        await queryRunner.dropColumn("customer", "commission");
        await queryRunner.dropColumn("customer", "affiliate_status");
    }
}
