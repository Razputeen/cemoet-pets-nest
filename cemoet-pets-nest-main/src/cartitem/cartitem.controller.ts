import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartitemService } from './cartitem.service';
import { CreateCartitemDto } from './dto/create-cartitem.dto';
import { UpdateCartitemDto } from './dto/update-cartitem.dto';

@Controller('cartitem')
export class CartitemController {
  constructor(private readonly cartitemService: CartitemService) {}

  @Post()
  create(@Body() createCartitemDto: CreateCartitemDto) {
    return this.cartitemService.create(createCartitemDto);
  }

  @Get()
  findAll() {
    return this.cartitemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartitemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartitemDto: UpdateCartitemDto) {
    return this.cartitemService.update(+id, updateCartitemDto);
  }

// cart-item.controller.ts
@Delete(':cartId/:productId')
async removeItem(
  @Param('cartId') cartId: string,
  @Param('productId') productId: string,
) {
  return this.cartitemService.removeItem(cartId, productId);
}

}
