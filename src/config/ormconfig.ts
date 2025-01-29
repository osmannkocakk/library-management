import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Password!@",
    database: "library",
    entities: [User, Book],
    synchronize: true,
});
