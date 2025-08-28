import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from '#/auth/auth.guard';
import { AddToCartDto } from '#/cart/dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  async addToCart(@Body() body: { userId: string; productId: string; quantity: number }) {
    return this.cartService.addToCart(body.userId, body.productId, body.quantity);
  }

  @Get('user/:userId')
  async getCartByUser(@Param('userId') userId: string) {
    return this.cartService.findByUserId(userId);
  }

  @Patch(':cartId/:productId')
  async updateQuantity(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(cartId, productId, quantity);
  }

  @Delete(':cartId')
  removeItem(@Param('cartId') cartId: string) {
    return this.cartService.removeItem(cartId);
  }

  @Post('checkout/:id')
  @UseGuards(AuthGuard)
  async checkout(@Param('id') cartId: string, @Req() req) {
    const userId = req.user.id; // ini baru ada
    return this.cartService.checkout(cartId, userId);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Get()
  async getUserCart(@Req() req) {
    const userId = req.user.id; // dari token
    return this.cartService.findUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
