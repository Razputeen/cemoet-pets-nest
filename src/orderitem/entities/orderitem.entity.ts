import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "#/order/entities/order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: "CASCADE"
  })
  order: Order;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  total: number;
}
