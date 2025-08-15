import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '#/product/entities/product.entity';
import { number } from 'joi';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ){}
  create(createCartDto: CreateCartDto) {
    const result = this.cartRepository.create(createCartDto);
    return this.cartRepository.save(result);
  }

async addToCart(userId: string, productId: string, quantity: number) {
  const product = await this.productRepository.findOneBy({ id: productId });
  if (!product) throw new NotFoundException('Product not found');

  let cart = await this.cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ['products', 'user'],
  });

  if (!cart) {
    cart = this.cartRepository.create({
      name: 'My Cart',
      total: 0,
      quantity: 0,
      user: { id: userId },
      products: [],
    });
  }

  cart.products.push(product);
  cart.quantity += quantity;
  cart.total += product.price * quantity;

  return this.cartRepository.save(cart);
}

async findByUserId(userId: string) {
  return await this.cartRepository.find({
    where: { user: { id: userId } },
    relations: ['products', 'user', 'products.images'],
  });
}


  

  findAll() {
    return this.cartRepository.find(
      {
        relations: ['user', 'products', 'products.images'],
      }
    );
  }

  findOne(id: string) {
    return this.cartRepository.findOne({
      where: { id },
    });
  }

    async updateQuantity(cartId: string, quantity: number) {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!cartItem) throw new NotFoundException('Cart item not found');

    cartItem.quantity = quantity;
    await this.cartRepository.save(cartItem);
    return { message: 'Quantity updated', data: cartItem };
  }

async removeItem(cartId: string) {
  const cartItem = await this.cartRepository.findOne({
    where: { id: cartId },
    relations: ['products'], // pastikan ambil relasinya
  });

  if (!cartItem) throw new NotFoundException('Cart item not found');

  // hapus relasi produk dulu
  cartItem.products = [];
  await this.cartRepository.save(cartItem);

  // baru hapus cart
  await this.cartRepository.remove(cartItem);

  return { message: 'Item removed from cart' };
}

  async findUser(id: string) {
    return this.cartRepository.find({
      where: { user: { id } },
      relations: ['user', 'products'],
    });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
