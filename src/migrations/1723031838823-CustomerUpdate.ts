import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CustomerUpdate1723031838823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("customer", [
            new TableColumn({
                name: "paypal_email",
                type: "int8",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("customer", [
            "affiliate_order_count",
        ])
    }

}
