import { Alamat } from '#/alamat/entities/alamat.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { Clinic } from '#/clinic/entities/clinic.entity';
import { GroomingReservation } from '#/grooming-reservation/entities/grooming-reservation.entity';
import { GroomingReservationService } from '#/grooming-reservation/grooming-reservation.service';
import { HotelRes } from '#/hotel-res/entities/hotel-re.entity';
import { Hotel } from '#/hotel/entities/hotel.entity';
import { Order } from '#/order/entities/order.entity';
import { Review } from '#/review/entities/review.entity';
import { Role } from '#/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNum: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => GroomingReservation, (reserveGroom) => reserveGroom.user, {})
  reserveGroom: GroomingReservation[];

  @OneToOne(() => Cart, (cart) => cart.user, {nullable: true})
  cart: Cart;
  
  @OneToOne(() => Alamat, alamat => alamat.user)
  alamatPick: Alamat[];

  @OneToMany(() => Order, (order) => order.user, {})
  order: Order[];

  @OneToMany(() => Clinic, (clinic) => clinic.user, {nullable: true})
  clinic: Clinic[];

  @OneToMany(() => HotelRes, (hotelres) => hotelres.user, {nullable: true})
  hotelres: HotelRes[];

  @OneToMany(() => Review, (review) => review.user, {
    onDelete: 'CASCADE',
  })
  review: Review[];
  
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;

  @VersionColumn()
  version: number;
    carts: any;
}
