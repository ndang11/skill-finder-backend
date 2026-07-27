import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: string, createReviewDto: CreateReviewDto) {
    throw new Error('Not implemented');
  }

  async findByProfessional(professionalId: string) {
    return [];
  }

  async getAverageRating(professionalId: string): Promise<number> {
    return 0;
  }
}
