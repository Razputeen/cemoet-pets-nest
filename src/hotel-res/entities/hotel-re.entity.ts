import { Groom } from '#/grooms/entities/groom.entity';
import { Hotel } from '#/hotel/entities/hotel.entity';
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
export abstract class HotelRes {
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
  amountDays: Date;

  @Column({default: "Not Ready"})
  status: string

  @ManyToOne(() => User, (user) => user.hotelres, {})
  user: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.hotelres, {nullable: true})
  @JoinTable()
  hotel: Hotel;
  

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
