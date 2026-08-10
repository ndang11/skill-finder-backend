import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  async getBookmarks(userId: string) {
    const savedSkills = await this.prisma.savedSkill.findMany({
      where: { userId },
      include: {
        skill: {
          include: {
            provider: {
              select: {
                id: true,
                fullName: true,
                avatarUrl: true,
                location: true,
                whatsappNumber: true,
                bio: true,
              },
            },
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return savedSkills.map((item) => {
      const reviews = item.skill.reviews || [];
      const totalReviews = reviews.length;
      const averageRating =
        totalReviews > 0
          ? Math.round(
              (reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                totalReviews) *
                10,
            ) / 10
          : 0;

      return {
        id: item.id,
        skillId: item.skillId,
        createdAt: item.createdAt.toISOString(),
        title: item.skill.title,
        description: item.skill.description,
        category: item.skill.category,
        price: item.skill.price,
        provider: {
          id: item.skill.provider.id,
          fullName: item.skill.provider.fullName || 'Professional',
          avatarUrl: item.skill.provider.avatarUrl,
          location: item.skill.provider.location || 'Cameroon',
          whatsappNumber: item.skill.provider.whatsappNumber,
          bio: item.skill.provider.bio,
          averageRating,
          totalReviews,
        },
      };
    });
  }

  async addBookmark(userId: string, skillId: string) {
    // Check if skill exists
    const skill = await this.prisma.skill.findUnique({
      where: { id: skillId },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID "${skillId}" not found`);
    }

    // Upsert or find existing bookmark
    const existing = await this.prisma.savedSkill.findUnique({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.savedSkill.create({
      data: {
        userId,
        skillId,
      },
    });
  }

  async removeBookmark(userId: string, skillId: string) {
    const existing = await this.prisma.savedSkill.findUnique({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
    });

    if (!existing) {
      return { success: true, message: 'Bookmark not found or already removed' };
    }

    await this.prisma.savedSkill.delete({
      where: {
        id: existing.id,
      },
    });

    return { success: true, message: 'Bookmark removed successfully' };
  }

  async checkIsBookmarked(userId: string, skillId: string) {
    const bookmark = await this.prisma.savedSkill.findUnique({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
    });

    return { isBookmarked: !!bookmark };
  }
}
