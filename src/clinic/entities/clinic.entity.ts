import { Groom } from '#/grooms/entities/groom.entity';
import { User } from '#/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  petName: string;

  @Column()
  petBreed: string;

  @Column()
  petAge: number;

  @Column()
  petType: string;

  @Column()
  appointmentDate: Date;

  @Column()
  description: string;

  @Column({default: "Not Ready"})
  status: string

  @ManyToMany(() => Clinic, (clinic) => clinic)
  @JoinTable() // This creates the pivot table
  clinic: Clinic[];

  @ManyToOne(() => User, (user) => user.clinic, {})
  user: User;

  @Column({
    name: 'is_activated',
    type: 'boolean',
    default: true,
  })
  isActivated: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  deletedAt: Date;
}
