import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '#/product/entities/product.entity';
import { Cart } from './entities/cart.entity';
import { User } from '#/users/entities/user.entity';
import { CartItem } from '#/cartitem/entities/cartitem.entity';
import { MidtransModule } from '#/midtrans/midtrans.module';
import { Order } from '#/order/entities/order.entity';
import { OrderItem } from '#/orderitem/entities/orderitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Cart, CartItem, Order, User, OrderItem]), MidtransModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [TypeOrmModule]
})
export class CartModule {}
