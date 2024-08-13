import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateOrder1723538392637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("order", [
            new TableColumn({
                name: "payout_status",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn({
                name: "payout_link",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn({
                name: "payout_created_on",
                type: "timestamp",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("order", [
            "payout_status",
            "payout_link",
            "payout_created_on"
        ])
    }

}
