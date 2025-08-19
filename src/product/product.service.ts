import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '#/productimage/entities/productimage.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
  ) {}
  async create(data: any, imageUrls: string[]) {
    const product = this.productRepository.create({
      name: data.name,
      price: data.price,
      description: data.description,
      stock: data.stock,
      category: data.category,
      brand: data.brand,
      weight: data.weight,
      specification: data.specification,
    });

    await this.productRepository.save(product);
    const images = imageUrls.map(url => this.productImageRepo.create({ url, product }));
    await this.productImageRepo.save(images);
    return {...product, images};
  }

  findAll() {
    return this.productRepository.find({
      relations: ['images']
    });
  }

  findOne(id: string) {
    const result = this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['images']
    });
    return result;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
        try {
          await this.productRepository.findOneOrFail({
            where: {
              id,
            },
          });
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }
    
        await this.productRepository.delete(id);
  }
}
