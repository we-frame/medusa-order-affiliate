import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateCustomerFieldsDefaultValue1721991872928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns("customer", [
            {
                oldColumn: new TableColumn({
                    name: "total_sales",
                    type: "decimal",
                    precision: 10, 
                    scale: 2,
                    isNullable: true
                }),
                newColumn: new TableColumn({
                    name: "total_sales",
                    type: "decimal",
                    precision: 10, 
                    scale: 2,
                    isNullable: true,
                    default: 0
                })
            },
            {
                oldColumn: new TableColumn({
                    name: "affiliate_status",
                    type: "varchar",
                    isNullable: true
                }),
                newColumn: new TableColumn({
                    name: "affiliate_status",
                    type: "varchar",
                    isNullable: true,
                    default: "'pending'"
                })
            }
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns("customer", [
            {
                oldColumn: new TableColumn({
                    name: "total_sales",
                    type: "decimal",
                    precision: 10, 
                    scale: 2,
                    isNullable: true,
                    default: 0
                }),
                newColumn: new TableColumn({
                    name: "total_sales",
                    type: "decimal",
                    precision: 10, 
                    scale: 2,
                    isNullable: true
                }),
                
            },
            {
                oldColumn: new TableColumn({
                    name: "affiliate_status",
                    type: "varchar",
                    isNullable: true,
                    default: "'pending'"
                }),
                newColumn: new TableColumn({
                    name: "affiliate_status",
                    type: "varchar",
                    isNullable: true
                }),
                
            }
        ])
    }
}
