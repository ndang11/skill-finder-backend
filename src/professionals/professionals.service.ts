import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { SearchProfessionalDto } from './dto/search-professional.dto.js';
import type { UpdateProfessionalDto } from './dto/update-professional.dto.js';

@Injectable()
export class ProfessionalsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a bare professional profile for a newly-verified user.
   * The user fills in the remaining fields via the update endpoint.
   */
  async create(userId: string, categoryId: string, location: string) {
    return this.prisma.professional.upsert({
      where: { userId },
      update: { categoryId, location },
      create: { userId, categoryId, location, skills: [] },
      include: { user: true, category: true },
    });
  }

  async findAll(searchDto: SearchProfessionalDto) {
    return this.prisma.professional.findMany({
      where: {
        ...(searchDto.category && {
          category: {
            slug: { contains: searchDto.category, mode: 'insensitive' },
          },
        }),
        ...(searchDto.location && {
          location: { contains: searchDto.location, mode: 'insensitive' },
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            username: true,
            avatarUrl: true,
            isVerifiedProfessional: true,
          },
        },
        category: true,
        reviews: {
          select: { rating: true },
        },
      },
      orderBy: { completedJobs: 'desc' },
    });
  }

  async findOne(id: string) {
    const prof = await this.prisma.professional.findFirst({
      where: { OR: [{ id }, { userId: id }] },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            username: true,
            avatarUrl: true,
            isVerifiedProfessional: true,
          },
        },
        category: true,
        reviews: {
          include: {
            customer: {
              select: { id: true, fullname: true, avatarUrl: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!prof) throw new NotFoundException(`Professional profile not found`);
    return prof;
  }

  async update(userId: string, updateDto: UpdateProfessionalDto) {
    const prof = await this.prisma.professional.findUnique({ where: { userId } });
    if (!prof) throw new NotFoundException(`Professional profile not found`);

    return this.prisma.professional.update({
      where: { userId },
      data: updateDto,
      include: { user: true, category: true },
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
