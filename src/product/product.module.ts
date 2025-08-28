import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '#/productimage/entities/productimage.entity';
import { Cart } from '#/cart/entities/cart.entity';
import { CartItem } from '#/cartitem/entities/cartitem.entity';
import { MidtransModule } from '#/midtrans/midtrans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Cart, CartItem]), MidtransModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
