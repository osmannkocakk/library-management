"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const bookController_1 = require("./controllers/bookController");
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/users", userController_1.getUsers);
app.get("/users/:id", userController_1.getUser);
//app.post("/users", createUser);
app.get("/books", bookController_1.getBooks);
app.get("/books/:id", bookController_1.getBook);
//app.post("/books", createBook);
app.post("/users/:userId/borrow/:bookId", bookController_1.borrowBook);
//app.post("/users/:userId/return/:bookId", returnBook);
app.use(errorHandler_1.errorHandler);
exports.default = app;
