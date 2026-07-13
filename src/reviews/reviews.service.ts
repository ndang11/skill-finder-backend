import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: string, createReviewDto: CreateReviewDto) {
    // Ensure the professional profile exists
    const prof = await this.prisma.professional.findUnique({
      where: { id: createReviewDto.professionalId },
    });
    if (!prof) throw new NotFoundException(`Professional not found`);

    // Prevent a professional from reviewing themselves
    if (prof.userId === customerId) {
      throw new ForbiddenException(`You cannot review your own profile`);
    }

    return this.prisma.review.create({
      data: {
        professionalId: createReviewDto.professionalId,
        customerId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
      },
      include: {
        customer: { select: { id: true, fullname: true, avatarUrl: true } },
      },
    });
  }

  async findByProfessional(professionalId: string) {
    return this.prisma.review.findMany({
      where: { professionalId },
      include: {
        customer: { select: { id: true, fullname: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAverageRating(professionalId: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { professionalId },
      _avg: { rating: true },
    });
    return Math.round((result._avg.rating ?? 0) * 10) / 10;
  }
}
