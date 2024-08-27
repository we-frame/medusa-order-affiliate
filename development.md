```json
{
  "resolve": "medusa_order_affiliate_plugin",
  "options": {
    "medusa_api_url": "<base-url-of-pluggedin medusa>",
    "paypal_client_id": "",
    "paypal_client_secret": "",
    "paypal_api_url": ""
  }
}
```

# ExtendCustomer

```ts
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ExtendCustomer1723709020240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("customer", [
      new TableColumn({
        name: "affiliate_code",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "total_sales",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: "commission",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: "affiliate_status",
        type: "varchar",
        isNullable: true,
        default: "'pending'",
      }),
      new TableColumn({
        name: "last_login",
        type: "timestamp",
        isNullable: true,
      }),
      new TableColumn({
        name: "affiliate_verified_on",
        type: "timestamp",
        isNullable: true,
      }),
      new TableColumn({
        name: "is_affiliate",
        type: "boolean",
        isNullable: true,
      }),
      new TableColumn({
        name: "affiliate_order_count",
        type: "int8",
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: "paypal_email",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("customer", [
      "paypal_email",
      "affiliate_order_count",
      "affiliate_status",
      "commission",
      "total_sales",
      "affiliate_code",
      "last_login",
      "affiliate_verified_on",
      "is_affiliate",
    ]);
  }
}
```

# ExtendOrder

```ts
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ExtendOrder1723709027649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("order", [
      new TableColumn({
        name: "code_used",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "commission",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: "commission_rate",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: "commission_created_on",
        type: "timestamp",
        isNullable: true,
      }),
      new TableColumn({
        name: "payout_done",
        type: "boolean",
        isNullable: true,
      }),
      new TableColumn({
        name: "payout_link",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "payout_status",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("order", [
      "code_used",
      "commission",
      "commission_rate",
      "commission_created_on",
      "payout_done",
      "payout_link",
      "payout_status",
    ]);
  }
}
```

# CreateIffiliate

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAffiliate1721981741010 implements MigrationInterface {
  name = "CreateAffiliate1721981741010";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "affiliate_log" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying NOT NULL, "commission" numeric NOT NULL, "metadata" jsonb NOT NULL, "customer_id" character varying NOT NULL, CONSTRAINT "PK_8c351ca0017da767d3d4c7ce8f1" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "affiliate_log"`);
  }
}
```

# CreatePayout

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class Payoutcreate1723102285920 implements MigrationInterface {
  name = "Payoutcreate1723102285920";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payout" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_id" character varying NOT NULL, "amount" numeric NOT NULL, "customer_id" character varying NOT NULL, "status" character varying NOT NULL, "paypal_email" character varying NOT NULL, "paypal_payout_link" character varying NOT NULL "metadata" jsonb NOT NULL, CONSTRAINT "PK_1cb73ce021dc6618a3818b0a474" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payout"`);
  }
}
```

Needs running postgres

```yaml
version: "3"
services:
  # Postgres database for Medusa
  medusa_postgres:
    image: postgres:13
    ports:
      - 5434:5432
    volumes:
      - pgdata_medusa:/var/lib/postgresql/data
    networks:
      - directus_network
    environment:
      POSTGRES_USER: medusa_user
      POSTGRES_PASSWORD: medusa_password
      POSTGRES_DB: medusa_db

  redis:
    image: redis:latest
    container_name: redis-db
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

networks:
  directus_network:

volumes:
  pgdata_medusa:
  redis_data:
    driver: local
```

1. Create new medusa project
1. `medusa new plugin_tester`
1. `cd /plugin_tester`
1. `npm run seed`

1. Prepare and link plugin
1. `cd /pilotinstitute_medusa_affiliate_plugin`
1. `npm i`
1. `npm run prepare`
1. `npm link`

1. Connect Plugin tester to plugin
1. `cd /plugin_tester`
1. `npm link medusa-order-affiliate`
1. `npx medusa migrations run`
1. `npm run dev -- -- --preserve-symlinks`

## (Subscribers) customer-create-handler.ts

```js
import {
  Customer,
  CustomerService,
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/medusa";
import AffiliateService from "../services/affiliate";
import { AffiliateLog } from "../models/affiliate";

export default async function customerCreateHandler({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, any>>) {
  if (eventName == "customer.created") {
    // console.log("============= customer created subscriber fired =================");
    // console.log("data: ", data);

    const affiliateService: AffiliateService =
      container.resolve("affiliateService");
    const customerService: CustomerService =
      container.resolve("customerService");

    const { id, first_name, last_name } = data;

    let staticPart: string;
    if (first_name != null) {
      staticPart = first_name[0];
    } else if (last_name != null) {
      staticPart = last_name[0];
    } else {
      staticPart = "P";
    }

    // console.log("staticPart: ", staticPart);

    var maxRetries: number = 5;
    var validCodeFound: boolean = false;
    let tempCode: string;
    let code: string;

    for (var i = 0; i < maxRetries && !validCodeFound; i++) {
      code = generateRandomString(staticPart.toLocaleLowerCase());
      // console.log("internal code: ", code);
      if (tempCode == code) {
        tempCode = code;
        continue;
      } else {
        const result = await affiliateService.checkCodeAwailability(code);
        if (result) {
          validCodeFound = true;
          break;
        } else {
          continue;
        }
      }
    }

    if (code != null) {
      const newAffiliate = new AffiliateLog();
      newAffiliate.code = code;
      newAffiliate.commission = 20;
      newAffiliate.metadata = { customer_id: id };

      const createdAffiliate = await affiliateService.create(code, 20, id, {});
      // console.log("createdAffiliate: ", createdAffiliate);

      const customer = new Customer();
      customer.affiliate_code = code;
      customer.commission = 20;

      const updatedCustomer = await customerService.update(id, customer);
      // console.log("updatedCustomer: ", updatedCustomer);
    } else {
      console.log("[ERRPR] [CUSTOMER CREATE SUBSCRIBER] => code is null");
    }
  }
}

export const config: SubscriberConfig = {
  event: CustomerService.Events.CREATED,
  context: {
    subscriberId: "customer-create-handler",
  },
};

function generateRandomString(staticPart: string): string {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let randomString = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return `${randomNumber}_${staticPart}_${randomString}`;
}
```
