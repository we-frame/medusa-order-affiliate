import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class OrderExtend1721981827560 implements MigrationInterface {

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
                isNullable: true
            }),
            new TableColumn({
                name: "commission_rate",
                type: "decimal",
                precision: 10,
                scale: 2,
                isNullable: true
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("order", "code_used");
        await queryRunner.dropColumn("order", "commission");
        await queryRunner.dropColumn("order", "commission_rate");
    }

}
