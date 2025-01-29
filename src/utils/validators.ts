import { body } from "express-validator";

export const validateUser = [
    body("name").isString().notEmpty().withMessage("User Name is required")
];

export const validateBook = [
    body("name").isString().notEmpty().withMessage("Book Name is required")
];

export const validateReturnBook = [
    body("score").isInt({ min: 0, max: 10 }).withMessage("Score rating must be between 0 and 10")
];