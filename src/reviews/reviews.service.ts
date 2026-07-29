import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: string, createReviewDto: CreateReviewDto) {
    const { professionalId, rating, comment, skillId, bookingId } =
      createReviewDto;

    if (customerId === professionalId) {
      throw new BadRequestException('You cannot leave a review for yourself');
    }

    const professionalUser = await this.prisma.user.findUnique({
      where: { id: professionalId },
    });

    if (!professionalUser) {
      throw new NotFoundException('Professional user not found');
    }

    return this.prisma.review.create({
      data: {
        authorId: customerId,
        receiverId: professionalId,
        rating: Math.min(5, Math.max(1, Math.round(rating))),
        comment: comment?.trim() || '',
        skillId: skillId || null,
        bookingId: bookingId || null,
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        skill: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
    });
  }

  async findByProfessional(professionalId: string) {
    return this.prisma.review.findMany({
      where: { receiverId: professionalId },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        skill: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByAuthor(authorId: string) {
    return this.prisma.review.findMany({
      where: { authorId },
      include: {
        receiver: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        skill: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAverageRating(professionalId: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { receiverId: professionalId },
      _avg: { rating: true },
    });
    return result._avg.rating ? Math.round(result._avg.rating * 10) / 10 : 0;
  }
}
