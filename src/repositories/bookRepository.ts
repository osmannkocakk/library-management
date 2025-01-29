import { Repository, EntityRepository } from "typeorm";
import { Books } from "../entities/Books";

@EntityRepository(Books)
export class BookRepository extends Repository<Books> {
}