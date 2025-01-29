import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Books } from "./Books";

@Entity()
export class BorrowRecords {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, user => user.borrowRecords)
    user: Users;

    @ManyToOne(() => Books, book => book.borrowRecords)
    book: Books;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    borrowed_at: Date;

    @Column({ type: "timestamp", nullable: true })
    returned_at: Date;

    @Column({ type: "int", nullable: true })
    rating: number;
}