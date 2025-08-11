import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductimageService } from './productimage.service';
import { CreateProductimageDto } from './dto/create-productimage.dto';
import { UpdateProductimageDto } from './dto/update-productimage.dto';

@Controller('productimage')
export class ProductimageController {
  constructor(private readonly productimageService: ProductimageService) {}

  @Post()
  create(@Body() createProductimageDto: CreateProductimageDto) {
    return this.productimageService.create(createProductimageDto);
  }

  @Get()
  findAll() {
    return this.productimageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productimageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductimageDto: UpdateProductimageDto) {
    return this.productimageService.update(+id, updateProductimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productimageService.remove(+id);
  }
}
