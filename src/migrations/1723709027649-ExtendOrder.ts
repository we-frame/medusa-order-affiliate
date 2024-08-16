import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class ExtendOrder1723709027649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("order", [
            new TableColumn({
                name: "code_used",
                type: "varchar",
                isNullable: true
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
                name: "commission_rate",
                type: "decimal",
                precision: 10,
                scale: 2,
                isNullable: true,
                default: 0
            }),
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
            new TableColumn({
                name: "payout_link",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn({
                name: "payout_status",
                type: "varchar",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("order", [
            "code_used",
            "commission",
            "commission_rate",
            "commission_created_on",
            "payout_done",
            "payout_link",
            "payout_status"
        ])
    }

}
