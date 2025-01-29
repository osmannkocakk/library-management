import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "float", default: 0 })
    average_rating: number;

    @CreateDateColumn()
    created_at: Date;
}
