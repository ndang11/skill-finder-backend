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
let BookmarksService = class BookmarksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBookmarks(userId) {
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
            const averageRating = totalReviews > 0
                ? Math.round((reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                    totalReviews) *
                    10) / 10
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
    async addBookmark(userId, skillId) {
        const skill = await this.prisma.skill.findUnique({
            where: { id: skillId },
        });
        if (!skill) {
            throw new NotFoundException(`Skill with ID "${skillId}" not found`);
        }
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
    async removeBookmark(userId, skillId) {
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
    async checkIsBookmarked(userId, skillId) {
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
};
BookmarksService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BookmarksService);
export { BookmarksService };
//# sourceMappingURL=bookmarks.service.js.map