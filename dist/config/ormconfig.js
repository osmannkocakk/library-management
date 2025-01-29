"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "libraryadmin",
    password: process.env.DB_PASSWORD || "LibraryPasword!*",
    database: process.env.DB_NAME || "library",
    entities: [__dirname + "../entities/*.ts"],
    synchronize: true,
});
