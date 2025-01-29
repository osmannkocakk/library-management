"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = exports.getUsers = void 0;
const userService_1 = require("../services/userService");
const express_validator_1 = require("express-validator");
const userService = new userService_1.UserService();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.getAllUsers();
    res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield userService.getUserById(userId);
        res.json(user);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(404).json({ message: errorMessage });
    }
});
exports.getUser = getUser;
exports.createUser = [
    (0, express_validator_1.body)("name").isString().notEmpty(),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name } = req.body;
        try {
            const user = yield userService.createUser(name);
            res.status(201).json(user);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            res.status(404).json({ message: errorMessage });
        }
    })
];
