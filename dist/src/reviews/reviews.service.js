var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ForbiddenException, NotFoundException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(customerId, createReviewDto) {
        const { professionalId, rating, comment, skillId, bookingId } = createReviewDto;
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
    async findByProfessional(professionalId) {
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
    async findByAuthor(authorId) {
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
    async getAverageRating(professionalId) {
        const result = await this.prisma.review.aggregate({
            where: { receiverId: professionalId },
            _avg: { rating: true },
        });
        return result._avg.rating ? Math.round(result._avg.rating * 10) / 10 : 0;
    }
};
ReviewsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReviewsService);
export { ReviewsService };
//# sourceMappingURL=reviews.service.js.map