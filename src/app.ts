import express from "express";
import { UserController } from "./controllers/userController";

const app = express();
app.use(express.json());

app.get("/users", UserController.getUsers);

export default app;
