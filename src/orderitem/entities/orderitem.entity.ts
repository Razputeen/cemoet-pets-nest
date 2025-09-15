import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "#/order/entities/order.entity";
import { Product } from "#/product/entities/product.entity";

// orderitem.entity.ts
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: "CASCADE",
  })
  order: Order;

  // ✅ relasi ke Product (satu orderItem = satu produk)
  @ManyToOne(() => Product, (product) => product.orderItems, {
    eager: true, // biar otomatis ikut ke-load
  })
  product: Product;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  total: number;
}

