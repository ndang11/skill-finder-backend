import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Only customers can leave reviews
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('customer')
  @Post()
  create(@GetUser('id') customerId: string, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(customerId, createReviewDto);
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
