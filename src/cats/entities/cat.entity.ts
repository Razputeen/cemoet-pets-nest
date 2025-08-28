import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
