import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class OrderUpdate1722422558846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("order", [
            new TableColumn({
                name: "commission_created_on",
                type: "timestamp",
                isNullable: true
            }),
            new TableColumn({
                name: "payout_done",
                type: "boolean",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("order", [
            "commission_created_on",
            "payout_done"
        ])
    }
}
