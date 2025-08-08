import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  create(createProductDto: CreateProductDto) {
    const result = this.productRepository.create(createProductDto);
    return this.productRepository.save(result);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const result = this.productRepository.findOne({
      where: {
        id,
      }
    });
    return result;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
