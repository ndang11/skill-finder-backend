import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
import { GetUser } from '../common/decorators/get-user.decorator.js';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Authenticated users can leave reviews for professionals
  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(
    @GetUser('id') customerId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(customerId, createReviewDto);
  }

  // Get reviews written by the currently logged-in user
  @UseGuards(SupabaseAuthGuard)
  @Get('my-reviews')
  findMyReviews(@GetUser('id') customerId: string) {
    return this.reviewsService.findByAuthor(customerId);
  }

  // Anyone can view reviews for a professional
  @Get('professional/:id')
  findByProfessional(@Param('id') professionalId: string) {
    return this.reviewsService.findByProfessional(professionalId);
  }

  // Anyone can view average rating for a professional
  @Get('professional/:id/rating')
  getAverageRating(@Param('id') professionalId: string) {
    return this.reviewsService.getAverageRating(professionalId);
  }
}
