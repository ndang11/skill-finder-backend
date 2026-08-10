import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { SearchProfessionalDto } from './dto/search-professional.dto.js';
import type { UpdateProfessionalDto } from './dto/update-professional.dto.js';

@Injectable()
export class ProfessionalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, categoryId: string, location: string) {
    // In the current schema, "Professional" is just a User.
    // There is no separate Professional profile table to create.
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(searchDto: SearchProfessionalDto) {
    let users = await this.prisma.user.findMany({
      where: {
        ...(searchDto.location && { location: { contains: searchDto.location, mode: 'insensitive' } }),
        ...(searchDto.query && {
          OR: [
            { fullName: { contains: searchDto.query, mode: 'insensitive' } },
            { bio: { contains: searchDto.query, mode: 'insensitive' } },
            { skills: { some: { title: { contains: searchDto.query, mode: 'insensitive' } } } },
            { skills: { some: { category: { contains: searchDto.query, mode: 'insensitive' } } } },
          ],
        }),
      },
      include: {
        skills: true,
        reviewsReceived: true,
        providerBookings: { where: { status: 'COMPLETED' } }
      }
    });

    if (searchDto.category && searchDto.category.toLowerCase() !== 'all') {
      const targetCat = searchDto.category.toLowerCase();
      users = users.filter(user =>
        user.skills.some(
          skill =>
            skill.category.toLowerCase() === targetCat ||
            skill.title.toLowerCase().includes(targetCat) ||
            targetCat.includes(skill.category.toLowerCase()),
        ),
      );
    }

    if (searchDto.minRating !== undefined) {
      users = users.filter(user => {
        const avg = user.reviewsReceived?.length > 0
          ? user.reviewsReceived.reduce((acc: number, r: any) => acc + r.rating, 0) / user.reviewsReceived.length
          : 0;
        return avg >= searchDto.minRating!;
      });
    }

    return users.map(user => this.mapUserToProfessionalProfile(user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        skills: true,
        reviewsReceived: true,
        providerBookings: { where: { status: 'COMPLETED' } }
      }
    });

    if (!user) throw new NotFoundException(`Professional profile not found`);

    return this.mapUserToProfessionalProfile(user);
  }

  async update(userId: string, updateDto: UpdateProfessionalDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`Professional profile not found`);

    if (updateDto.skills && Array.isArray(updateDto.skills)) {
      await this.prisma.skill.deleteMany({ where: { providerId: userId } });
      if (updateDto.skills.length > 0) {
        await this.prisma.skill.createMany({
          data: updateDto.skills.map((skillName) => ({
            title: skillName,
            description: skillName,
            category: updateDto.categoryId || 'General',
            providerId: userId,
          })),
        });
      }
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(updateDto.location !== undefined && { location: updateDto.location }),
        ...(updateDto.bio !== undefined && { bio: updateDto.bio }),
        ...(updateDto.whatsappNumber !== undefined && { whatsappNumber: updateDto.whatsappNumber }),
      },
    });

    return this.findOne(userId);
  }

  async getAverageRating(professionalId: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { receiverId: professionalId },
      _avg: { rating: true },
    });
    return Math.round((result._avg.rating ?? 0) * 10) / 10;
  }

  private mapUserToProfessionalProfile(user: any) {
    const averageRating = user.reviewsReceived?.length > 0
      ? user.reviewsReceived.reduce((acc: number, r: any) => acc + r.rating, 0) / user.reviewsReceived.length
      : 0;

    return {
      id: user.id,
      userId: user.id,
      fullName: user.fullName || '',
      avatarUrl: user.avatarUrl || null,
      category: user.skills?.[0]?.category || 'Uncategorized',
      location: user.location || 'Online',
      bio: user.bio || '',
      skills: user.skills?.map((s: any) => s.title) || [],
      averageRating: Math.round(averageRating * 10) / 10,
      completedJobs: user.providerBookings?.length || 0,
      whatsappNumber: user.whatsappNumber || '',
    };
  }
}
