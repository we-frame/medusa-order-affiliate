import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Customerupdate1722941877811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("customer", [
            new TableColumn({
                name: "affiliate_order_count",
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
