import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '#/product/entities/product.entity';
import { number } from 'joi';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '#/cartitem/entities/cartitem.entity';
import { MidtransService } from '#/midtrans/midtrans.service';
import { Order } from '#/order/entities/order.entity';
import { User } from '#/users/entities/user.entity';
import { OrderItem } from '#/orderitem/entities/orderitem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly midtransService: MidtransService, // 👈 jangan lupa ini
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

  ){}
  create(createCartDto: CreateCartDto) {
    const result = this.cartRepository.create(createCartDto);
    return this.cartRepository.save(result);
  }

async addToCart(userId: string, productId: string, quantity: number) {
  // cari cart existing
  let cart = await this.cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ['items', 'items.product'],
  });

  // kalau belum ada → bikin cart baru
  if (!cart) {
    cart = this.cartRepository.create({
      user: { id: userId },
      items: [],
      total: 0,
      quantity: 0,
    });
    cart = await this.cartRepository.save(cart);
  }

  // cari produk
  const product = await this.productRepository.findOne({
    where: { id: productId },
  });
  if (!product) throw new NotFoundException('Product not found');

  // cek apakah product sudah ada di cart
  let cartItem = cart.items.find((item) => item.product.id === productId);

  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.total = cartItem.quantity * product.price;
    await this.cartItemRepository.save(cartItem);
  } else {
    cartItem = this.cartItemRepository.create({
      cart,
      product,
      quantity,
      total: product.price * quantity,
    });
    await this.cartItemRepository.save(cartItem);
    cart.items.push(cartItem);
  }

  // update total & quantity cart
  cart.total = cart.items.reduce((acc, item) => acc + item.total, 0);
  cart.quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return this.cartRepository.save(cart);
}

// cart.service.ts
async checkout(cartId: string, userId: string) {
  const user = await this.userRepository.findOneBy({ id: userId });
  if (!user) throw new NotFoundException('User not found');

  const cart = await this.cartRepository.findOne({
    where: { id: cartId },
    relations: ['items', 'items.product'],
  });
  if (!cart) throw new NotFoundException('Cart not found');

  // Snapshot order items
  const orderItemsData = cart.items.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    total: item.quantity * item.product.price,
  }));

  const grossAmount = orderItemsData.reduce((sum, i) => sum + i.total, 0);

  // Buat transaksi ke Midtrans
  const transaction = await this.midtransService.createTransaction({
    transaction_details: {
      order_id: `ORDER-${cart.id}-${Date.now()}`,
      gross_amount: grossAmount,
    },
    item_details: orderItemsData.map(i => ({
      id: i.productId,
      price: i.price,
      quantity: i.quantity,
      name: i.productName,
    })),
  });

  // ✅ Simpan Order
  const order = this.orderRepository.create({
    user,
    cart,
    status: "Processing",
  });
  await this.orderRepository.save(order);

  // ✅ Simpan OrderItems (pivot ke order)
  const orderItems = orderItemsData.map((oi) =>
    this.orderItemRepository.create({ ...oi, order }),
  );
  await this.orderItemRepository.save(orderItems);

  // (opsional) kosongkan cart
  cart.items = [];
  cart.total = 0;
  cart.quantity = 0;
  await this.cartRepository.save(cart);

  return {
    orderId: order.id,
    token: transaction.token,
    redirectUrl: transaction.redirect_url,
  };
}




async findByUserId(userId: string) {
  return await this.cartRepository.find({
    where: { user: { id: userId } },
    relations: ['user', 'items', 'items.product.images',],
  });
}

  findAll() {
    return this.cartRepository.find(
      {
        relations: ['user', 'items', 'items.product.images',],
      }
    );
  }

  findOne(id: string) {
    return this.cartRepository.findOne({
      where: { id },
    });
  }

async updateQuantity(cartId: string, productId: string, quantity: number) {
  const cart = await this.cartRepository.findOne({
    where: { id: cartId },
    relations: ['items', 'items.product'],
  });
  if (!cart) throw new NotFoundException('Cart not found');

  const cartItem = cart.items.find((i) => i.product.id === productId);
  if (!cartItem) throw new NotFoundException('Product not found in cart');

  cartItem.quantity = quantity;
  cartItem.total = cartItem.product.price * quantity;
  cart.total = cart.items.reduce((sum, item) => sum + item.total, 0);

  return this.cartRepository.save(cart);
}


async removeItem(cartItemId: string) {
  const cartItem = await this.cartItemRepository.findOne({
    where: { id: cartItemId },
    relations: ['cart', 'product'],
  });

  if (!cartItem) {
    throw new NotFoundException('Cart item not found');
  }

  // Simpan referensi cart
  const cart = cartItem.cart;

  // Hapus cartItem
  await this.cartItemRepository.remove(cartItem);

  // Update ulang total dan quantity cart
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
