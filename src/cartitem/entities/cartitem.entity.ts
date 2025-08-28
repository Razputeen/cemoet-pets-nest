import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from '#/cart/entities/cart.entity';
import { Product } from '#/product/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, { eager: true })
  product: Product;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 0 })
  total: number;
}
