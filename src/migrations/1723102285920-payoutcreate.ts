import { MigrationInterface, QueryRunner } from "typeorm";

export class Payoutcreate1723102285920 implements MigrationInterface {
    name = 'Payoutcreate1723102285920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payout" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_id" character varying NOT NULL, "amount" numeric NOT NULL, "customer_id" character varying NOT NULL, "status" character varying NOT NULL, "paypal_email" character varying NOT NULL, "metadata" jsonb NOT NULL, CONSTRAINT "PK_1cb73ce021dc6618a3818b0a474" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payout"`);
    }

}
