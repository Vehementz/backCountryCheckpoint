import { DataSource } from "typeorm";
import { Country } from "./entities/Country";


const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: "countrysecret",
  database: "postgres",
  synchronize: true,
  entities: [Country],
  logging: ["query", "error"],
});

export default datasource;
