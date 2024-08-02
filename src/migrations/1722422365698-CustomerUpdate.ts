import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CustomerUpdate1722422365698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("customer", [
            new TableColumn({
                name: "is_affiliate",
                type: "boolean",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("customer", [
            "is_affiliate",
        ])
    }
}
