import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

    @Post(':productId/:userId')
  createReview(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
    @Body() body: { rating: number; comment?: string; imageUrl?: string },
  ) {
    return this.reviewService.createReview(productId, userId, body.rating, body.comment, body.imageUrl);
  }

  @Get(':productId')
  getReviewsByProduct(@Param('productId') productId: string) {
    return this.reviewService.getReviewsByProduct(productId);
  }

  @Get(':productId/summary')
  getProductWithRating(@Param('productId') productId: string) {
    return this.reviewService.getSummary(productId);
  }

}
