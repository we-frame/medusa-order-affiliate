import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateCustomer1723109866370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("customer", [
            new TableColumn({
                name: "paypal_email",
                type: "varchar",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("customer", [
            "paypal_email",
        ])
    }

}
