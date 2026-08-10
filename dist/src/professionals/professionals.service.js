var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ProfessionalsService = class ProfessionalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, categoryId, location) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new NotFoundException('User not found');
        return user;
    }
    async findAll(searchDto) {
        const where = {
            ...(searchDto.location && { location: { contains: searchDto.location, mode: 'insensitive' } }),
            ...(searchDto.query && {
                OR: [
                    { fullName: { contains: searchDto.query, mode: 'insensitive' } },
                    { bio: { contains: searchDto.query, mode: 'insensitive' } },
                    { skills: { some: { title: { contains: searchDto.query, mode: 'insensitive' } } } },
                    { skills: { some: { category: { contains: searchDto.query, mode: 'insensitive' } } } },
                ],
            }),
            ...(searchDto.category && searchDto.category.toLowerCase() !== 'all' ? {
                skills: { some: { category: { equals: searchDto.category, mode: 'insensitive' } } }
            } : {}),
        };
        const users = await this.prisma.user.findMany({
            where,
            include: {
                skills: true,
                reviewsReceived: true,
                providerBookings: { where: { status: 'COMPLETED' } }
            }
        });
        let filteredUsers = users;
        if (searchDto.minRating !== undefined) {
            filteredUsers = users.filter(user => {
                const avg = user.reviewsReceived?.length > 0
                    ? user.reviewsReceived.reduce((acc, r) => acc + r.rating, 0) / user.reviewsReceived.length
                    : 0;
                return avg >= searchDto.minRating;
            });
        }
        return filteredUsers.map(user => this.mapUserToProfessionalProfile(user));
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                skills: true,
                reviewsReceived: true,
                providerBookings: { where: { status: 'COMPLETED' } }
            }
        });
        if (!user)
            throw new NotFoundException(`Professional profile not found`);
        return this.mapUserToProfessionalProfile(user);
    }
    async update(userId, updateDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new NotFoundException(`Professional profile not found`);
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
    async getAverageRating(professionalId) {
        const result = await this.prisma.review.aggregate({
            where: { receiverId: professionalId },
            _avg: { rating: true },
        });
        return Math.round((result._avg.rating ?? 0) * 10) / 10;
    }
    mapUserToProfessionalProfile(user) {
        const averageRating = user.reviewsReceived?.length > 0
            ? user.reviewsReceived.reduce((acc, r) => acc + r.rating, 0) / user.reviewsReceived.length
            : 0;
        return {
            id: user.id,
            userId: user.id,
            fullName: user.fullName || '',
            avatarUrl: user.avatarUrl || null,
            category: user.skills?.[0]?.category || 'Uncategorized',
            location: user.location || 'Online',
            bio: user.bio || '',
            skills: user.skills?.map((s) => s.title) || [],
            averageRating: Math.round(averageRating * 10) / 10,
            completedJobs: user.providerBookings?.length || 0,
            whatsappNumber: user.whatsappNumber || '',
        };
    }
};
ProfessionalsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProfessionalsService);
export { ProfessionalsService };
//# sourceMappingURL=professionals.service.js.map