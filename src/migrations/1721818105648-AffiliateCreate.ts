import { MigrationInterface, QueryRunner } from "typeorm";

export class AffiliateCreate1721818105648 implements MigrationInterface {
    name = 'AffiliateCreate1721818105648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "affiliate" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying NOT NULL, "commission" numeric NOT NULL, "metadata" jsonb NOT NULL, CONSTRAINT "PK_1ce9ae335b25b11224e2756cfdc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "affiliate"`);
    }

}
