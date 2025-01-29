import { Repository, EntityRepository } from "typeorm";
import { Users } from "../entities/Users";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
}