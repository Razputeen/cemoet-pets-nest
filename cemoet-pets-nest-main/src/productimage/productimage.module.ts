import { Module } from '@nestjs/common';
import { ProductimageService } from './productimage.service';
import { ProductimageController } from './productimage.controller';

@Module({
  controllers: [ProductimageController],
  providers: [ProductimageService]
})
export class ProductimageModule {}
