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
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const BorrowRecord_1 = require("../entities/BorrowRecord");
class UserService {
    constructor() {
        this.userRepository = (0, typeorm_1.getRepository)(User_1.User);
        this.borrowRecordRepository = (0, typeorm_1.getRepository)(BorrowRecord_1.BorrowRecord);
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id },
                relations: ["borrowRecords", "borrowRecords.book"]
            });
            if (!user) {
                throw new Error("User not found");
            }
            const pastBooks = user.borrowRecords
                .filter(record => record.returned_at)
                .map(record => ({
                name: record.book.name,
                userScore: record.rating
            }));
            const presentBooks = user.borrowRecords
                .filter(record => !record.returned_at)
                .map(record => ({
                name: record.book.name
            }));
            return {
                id: user.id,
                name: user.name,
                books: {
                    past: pastBooks,
                    present: presentBooks
                }
            };
        });
    }
    createUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.name = name;
            return this.userRepository.save(user);
        });
    }
}
exports.UserService = UserService;
