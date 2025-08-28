
import { CartItem } from '#/cartitem/entities/cartitem.entity';
import { Order } from '#/order/entities/order.entity';
import { Product } from '#/product/entities/product.entity';
import { User } from '#/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({default: 'My Cart', nullable: true})
  name: string;

  @Column()
  total: number;

  @Column({default: 1})
  quantity: number;

  @OneToOne(() => User, user => user.carts, { nullable: true, cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[];

  @OneToMany(() => Order, (order) => order.cart, { nullable: true })
  order: Order[];

    @Column({ nullable: true })
  midtransToken: string;

  @Column({ nullable: true })
  midtransRedirectUrl: string;

  @Column({ nullable: true })
  transactionStatus: string; // settlement, pending, cancel, etc.

  @Column({ type: 'jsonb', nullable: true })
  midtransResponse: any;


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
}
