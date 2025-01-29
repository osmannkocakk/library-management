import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { body, validationResult } from "express-validator";

const bookService = new BookService();

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({ message: errorMessage});
    }
};

export const getBook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await bookService.getBookById(bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({ message: errorMessage });
    }
};

export const createBookHandler = async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { name } = req.body;
        try {
            const book = await bookService.createBook(name);
            res.status(201).json(book);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            res.status(500).json({ message: errorMessage });
        }
    };

export const borrowBook = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);
    try {
        await bookService.borrowBook(userId, bookId);
        res.status(204).send();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({ message: errorMessage });
    }
};

export const returnBookHandler = async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const userId = parseInt(req.params.userId);
        const bookId = parseInt(req.params.bookId);
        const { score } = req.body;
        try {
            await bookService.returnBook(userId, bookId, score);
            res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            res.status(500).json({ message: errorMessage });
        }
    };