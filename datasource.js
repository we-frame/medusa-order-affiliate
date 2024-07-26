const { DataSource } = require("typeorm")
const {Address, Customer, Order, Cart, LineItem, Swap, Return, ReturnItem, ReturnReason, ClaimOrder, ShippingMethod, ShippingOption, Region} = require("@medusajs/medusa/dist/models")
const { profile } = require("console")

const AppDataSource = new DataSource({
  type: "postgres",
  host: "13.126.88.85",
  port: 5432,
  username: "medusaadmin",
  password: "medusaadmin123",
  database: "medusadb",
  entities: [
    "dist/models/*.js", 
    // "node_modules/@medusajs/medusa/dist/models/*.js",
    Address, Customer, Order, Cart, LineItem, Swap, Return, ReturnItem, ReturnReason, ClaimOrder, ShippingMethod, ShippingOption, Region, 
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}