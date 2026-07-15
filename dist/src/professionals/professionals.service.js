var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ProfessionalsService = class ProfessionalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, categoryId, location) {
        return this.prisma.professional.upsert({
            where: { userId },
            update: { categoryId, location },
            create: { userId, categoryId, location, skills: [] },
            include: { user: true, category: true },
        });
    }
    async findAll(searchDto) {
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
    async findOne(id) {
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
        if (!prof)
            throw new NotFoundException(`Professional profile not found`);
        return prof;
    }
    async update(userId, updateDto) {
        const prof = await this.prisma.professional.findUnique({ where: { userId } });
        if (!prof)
            throw new NotFoundException(`Professional profile not found`);
        return this.prisma.professional.update({
            where: { userId },
            data: updateDto,
            include: { user: true, category: true },
        });
    }
    async getAverageRating(professionalId) {
        const result = await this.prisma.review.aggregate({
            where: { professionalId },
            _avg: { rating: true },
        });
        return Math.round((result._avg.rating ?? 0) * 10) / 10;
    }
};
ProfessionalsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProfessionalsService);
export { ProfessionalsService };
//# sourceMappingURL=professionals.service.js.map