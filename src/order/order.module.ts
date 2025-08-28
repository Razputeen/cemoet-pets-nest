import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '#/cart/entities/cart.entity';
import { User } from '#/users/entities/user.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Order])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
