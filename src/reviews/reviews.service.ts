import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';

export interface Review {
  id: string;
  professionalId: string;
  customerId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

@Injectable()
export class ReviewsService {
  private reviews: Review[] = []; // In-memory store

  async create(customerId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      customerId,
      ...createReviewDto,
      createdAt: new Date(),
    };
    this.reviews.push(newReview);
    return newReview;
  }

  async findByProfessional(professionalId: string): Promise<Review[]> {
    return this.reviews
      .filter((r) => r.professionalId === professionalId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAverageRating(professionalId: string): Promise<number> {
    const reviews = await this.findByProfessional(professionalId);
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }
}
