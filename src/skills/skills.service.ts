import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const skills = await this.prisma.skill.findMany({
      include: {
        provider: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            location: true,
            whatsappNumber: true,
            reviewsReceived: {
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

    return skills.map((skill) => {
      const reviews = skill.provider?.reviewsReceived || [];
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
          : 0;

      return {
        id: skill.id,
        title: skill.title,
        description: skill.description,
        category: skill.category,
        price: skill.price,
        providerId: skill.providerId,
        providerName: skill.provider?.fullName || 'Anonymous Provider',
        providerAvatar: skill.provider?.avatarUrl || null,
        providerLocation: skill.provider?.location || 'Cameroon',
        providerWhatsapp: skill.provider?.whatsappNumber || '',
        averageRating: Math.round(avgRating * 10) / 10,
        createdAt: skill.createdAt,
      };
    });
  }

  async findByCategory(categoryName: string) {
    const all = await this.findAll();
    return all.filter(
      (s) => s.category.toLowerCase() === categoryName.toLowerCase(),
    );
  }

  async findOne(id: string) {
    const skill = await this.prisma.skill.findUnique({
      where: { id },
      include: {
        provider: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            location: true,
            whatsappNumber: true,
            reviewsReceived: true,
          },
        },
      },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    const reviews = skill.provider?.reviewsReceived || [];
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    return {
      id: skill.id,
      title: skill.title,
      description: skill.description,
      category: skill.category,
      price: skill.price,
      providerId: skill.providerId,
      providerName: skill.provider?.fullName || 'Anonymous Provider',
      providerAvatar: skill.provider?.avatarUrl || null,
      providerLocation: skill.provider?.location || 'Cameroon',
      providerWhatsapp: skill.provider?.whatsappNumber || '',
      averageRating: Math.round(avgRating * 10) / 10,
      createdAt: skill.createdAt,
    };
  }
}
