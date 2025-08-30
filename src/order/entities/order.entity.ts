import { Cart } from "#/cart/entities/cart.entity";
import { OrderItem } from "#/orderitem/entities/orderitem.entity";
import { User } from "#/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// order.entity.ts
@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.order)
  cart: Cart;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}

