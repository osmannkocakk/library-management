import { DataSource } from "typeorm";
import { Users } from "../entities/Users";
import { Books } from "../entities/Books";
import { BorrowRecords } from "../entities/BorrowRecords";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "libraryadmin",
    password: process.env.DB_PASSWORD || "LibraryPasword!*",
    database: process.env.DB_NAME || "library",
     entities: [Users, Books, BorrowRecords], 
    synchronize: false,
    logging: ["query", "error"], 
});