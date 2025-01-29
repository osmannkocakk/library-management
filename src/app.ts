import express from "express";
import { getUsers, getUser, createUserHandler  } from "./controllers/userController";
import { getBooks, getBook, createBookHandler, borrowBook, returnBookHandler} from "./controllers/bookController";
import { errorHandler } from "./utils/errorHandler";
import { validateUser, validateBook, validateReturnBook } from "./utils/validators";

const app = express();

app.use(express.json());

app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.post("/users", validateUser, createUserHandler);

app.get("/books", getBooks);
app.get("/books/:id", getBook);
app.post("/books", validateBook,createBookHandler);
app.post("/users/:userId/borrow/:bookId", borrowBook);
app.post("/users/:userId/return/:bookId", validateReturnBook, returnBookHandler);

app.use(errorHandler);

export default app;