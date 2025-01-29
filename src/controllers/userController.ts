import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    static async getUsers(req: Request, res: Response) {
        const users = await UserService.getAllUsers();
        res.json(users);
    }
}
