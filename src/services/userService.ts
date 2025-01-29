import { Users } from "../entities/Users";
import { AppDataSource } from "../config/ormconfig";

export class UserService {
    private userRepository = AppDataSource.getRepository(Users);

    async getAllUsers() {
        return this.userRepository.find();
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
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
    }

    async createUser(name: string) {
        const user = new Users();
        user.name = name;
        return this.userRepository.save(user);
    }
}