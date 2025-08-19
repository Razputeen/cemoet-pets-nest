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
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  total: number;

  @Column({ default: 1 })
  quantity: number;

  // Relasi OneToOne ke User tanpa property reverse (user.carts)
  @OneToOne(() => User, { nullable: true, cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Product, (product) => product.cart)
  @JoinTable()
  products: Product[];

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
