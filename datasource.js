const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  host: "13.126.88.85",
  port: 5432,
  username: "medusaadmin",
  password: "medusaadmin123",
  database: "medusadb",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}