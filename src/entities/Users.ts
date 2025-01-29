import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BorrowRecords } from "./BorrowRecords";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @OneToMany(() => BorrowRecords, borrowRecord => borrowRecord.user)
    borrowRecords: BorrowRecords[];
}