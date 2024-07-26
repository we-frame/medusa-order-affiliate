import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateCustomerEntity1721992690609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("customer", [
            new TableColumn({
                name: "last_login",
                type: "timestamp",
                isNullable: true
            }),
            new TableColumn({
                name: "affiliate_verified_on",
                type: "timestamp",
                isNullable: true
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("customer", [
            "last_login",
            "affiliate_verified_on"
        ])
    }

}
