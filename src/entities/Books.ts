import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BorrowRecords } from "./BorrowRecords";

@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "float", default: 0 })
    average_rating: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @OneToMany(() => BorrowRecords, borrowRecords => borrowRecords.book)
    borrowRecords: BorrowRecords[];
}