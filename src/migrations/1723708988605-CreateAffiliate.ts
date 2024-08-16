import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAffiliate1723708988605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "affiliate_log" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying NOT NULL, "commission" numeric NOT NULL, "metadata" jsonb NOT NULL, "customer_id" character varying NOT NULL, CONSTRAINT "PK_8c351ca0017da767d3d4c7ce8f1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "affiliate_log"`);
    }
}
