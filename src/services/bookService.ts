import { Users } from "../entities/Users";
import { Books } from "../entities/Books";
import { BorrowRecords } from "../entities/BorrowRecords";
import { AppDataSource } from "../config/ormconfig";
import { IsNull } from "typeorm";

export class BookService {
    private bookRepository = AppDataSource.getRepository(Books);
    private borrowRecordRepository = AppDataSource.getRepository(BorrowRecords);
    private userRepository = AppDataSource.getRepository(Users);

    async getAllBooks() {
        return this.bookRepository.find();
    }

    async getBookById(id: number) {
        const book = await this.bookRepository.findOne({
            where: { id: id },
            relations: ["borrowRecords"]
        });

        if (!book) {
            throw new Error("Book not found");
        }

        const ratings = book.borrowRecords
            .filter(record => record.rating !== null)
            .map(record => record.rating);

        const averageRating = ratings.length > 0
            ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
            : "0";

        return {
            id: book.id,
            name: book.name,
            score: parseFloat(averageRating)
        };
    }

    async createBook(name: string) {
        const book = new Books();
        book.name = name;
        return this.bookRepository.save(book);
    }

    async borrowBook(userId: number, bookId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
            throw new Error("Book not found");
        }

        const existingBorrow = await this.borrowRecordRepository.findOne({
            where: { book: book, returned_at: IsNull() }
        });

        if (existingBorrow) {
            throw new Error("Book is already borrowed");
        }

        const borrowRecord = new BorrowRecords();
        borrowRecord.user = user;
        borrowRecord.book = book;
        borrowRecord.borrowed_at = new Date();
        await this.borrowRecordRepository.save(borrowRecord);
    }

    async returnBook(userId: number, bookId: number, rating: number) {
        const borrowRecord = await this.borrowRecordRepository.findOne({
            where: { user: { id: userId }, book: { id: bookId }, returned_at: IsNull() },
            relations: ["user", "book"]
        });

        if (!borrowRecord) {
            throw new Error("No active borrow record found");
        }

        borrowRecord.returned_at = new Date();
        borrowRecord.rating = rating;
        await this.borrowRecordRepository.save(borrowRecord);

        const book = await this.bookRepository.findOne({
            where: { id: bookId },
            relations: ["borrowRecords"]
        });

        if (book) {
            const ratings = book.borrowRecords
                .filter(record => record.rating !== null)
                .map(record => record.rating);

            const averageRating = ratings.length > 0
                ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
                : "-1"; 

            book.average_rating= parseFloat(averageRating);
            await this.bookRepository.save(book);
        }
    }
}