import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartitemDto } from './dto/create-cartitem.dto';
import { UpdateCartitemDto } from './dto/update-cartitem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cartitem.entity';
import { Cart } from '#/cart/entities/cart.entity';

@Injectable()
export class CartitemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ){}
  create(createCartitemDto: CreateCartitemDto) {
    return 'This action adds a new cartitem';
  }

  findAll() {
    return `This action returns all cartitem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartitem`;
  }

  update(id: number, updateCartitemDto: UpdateCartitemDto) {
    return `This action updates a #${id} cartitem`;
  }

async removeItem(cartId: string, productId: string) {
  const cartItem = await this.cartItemRepository.findOne({
    where: {
      cart: { id: cartId },
      product: { id: productId },
    },
    relations: ['cart', 'product'],
  });

  if (!cartItem) {
    throw new NotFoundException('Cart item not found');
  }

  const cart = cartItem.cart;

  await this.cartItemRepository.remove(cartItem);

  // sync ulang cart
  const updatedItems = await this.cartItemRepository.find({
    where: { cart: { id: cart.id } },
    relations: ['product'],
  });

  cart.items = updatedItems;
  cart.total = updatedItems.reduce((acc, item) => acc + item.total, 0);
  cart.quantity = updatedItems.reduce((acc, item) => acc + item.quantity, 0);

  await this.cartRepository.save(cart);

  return { message: 'Item removed from cart', cart };
}

}
