import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { body, validationResult } from "express-validator";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({ message: errorMessage});
    }
};

export const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({ message: errorMessage});
    }
};

export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { name } = req.body;
    try {
        const user = await userService.createUser(name);
        res.status(201).json(user);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({ message: errorMessage });
    }
};