import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdatePayout1723544154896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("payout", [
            new TableColumn({
                name: "paypal_payout_link",
                type: "varchar",
                isNullable: true
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("payout", [
            "paypal_payout_link",
        ])
    }

}
