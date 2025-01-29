import { AppDataSource } from "../config/ormconfig";
import { User } from "../entities/User";

export class UserService {
    static async getAllUsers() {
        return await AppDataSource.getRepository(User).find();
    }
}
