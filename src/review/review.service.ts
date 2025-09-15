import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from '#/product/entities/product.entity';
import { User } from '#/users/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createReview(productId: string, userId: string, rating: number, comment?: string, imageUrl?: string) {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException('Product not found');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const review = this.reviewRepository.create({
      rating,
      comment,
      imageUrl,
      product,
      user,
    });

    return this.reviewRepository.save(review);
  }

  async getReviewsByProduct(productId: string) {
    return this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

async getSummary(productId: string) {
  const { avg, count } = await this.reviewRepository
    .createQueryBuilder("review")
    .leftJoin("review.product", "product")
    .select("COALESCE(AVG(review.rating), 0)", "avg")
    .addSelect("COUNT(*)", "count")
    .where("product.id = :productId", { productId })
    .getRawOne();

  return {
    avgRating: parseFloat(avg) || 0,
    reviewCount: parseInt(count) || 0,
  };
}

}
