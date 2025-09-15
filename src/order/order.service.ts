import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

findAll() {
  return this.orderRepository.find({
    relations: [
      'user',
      'cart',
      'orderItems',         // parent wajib
      'orderItems.product', // child relation
      'orderItems.product.images',
    ],
  });
}

// ✅ ambil order berdasarkan userId
async findByUserId(userId: string) {
  return await this.orderRepository.find({
    where: { user: { id: userId } },
    relations: [
      'user',
      'orderItems',
      'orderItems.product',
      'orderItems.product.images',
    ],
    order: { createdAt: 'DESC' },
  });
}



  findOne(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: [
        'user',
        'orderItems',         // parent wajib
        'orderItems.product', // child relation
        'orderItems.product.images',
      ],
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
