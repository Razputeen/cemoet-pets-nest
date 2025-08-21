import { Module } from '@nestjs/common';
import { CartitemService } from './cartitem.service';
import { CartitemController } from './cartitem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '#/cart/entities/cart.entity';
import { Product } from '#/product/entities/product.entity';
import { CartItem } from './entities/cartitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, CartItem])],
  controllers: [CartitemController],
  providers: [CartitemService]
})
export class CartitemModule {}
