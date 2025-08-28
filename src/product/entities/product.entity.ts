

import { Cart } from '#/cart/entities/cart.entity';
import { CartItem } from '#/cartitem/entities/cartitem.entity';
import { ProductImage } from '#/productimage/entities/productimage.entity';
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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  name: string;

  @Column()
  price: number;

  @Column({default: 1})
  quantity: number;

  @Column({default: 0})
  total: number;

  @Column()
  description: string;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @Column()
  stock: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  weight: number;

  @Column()
  specification: string;
  
  @OneToMany(() => CartItem, (item) => item.product)
  cartItems: CartItem[];

      @Column({ nullable: true })
  midtransToken: string;

  @Column({ nullable: true })
  midtransRedirectUrl: string;

  @Column({ nullable: true })
  transactionStatus: string; // settlement, pending, cancel, etc.

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
    productCarts: any;
}
