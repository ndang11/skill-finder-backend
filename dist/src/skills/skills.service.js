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
let SkillsService = class SkillsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
            const avgRating = reviews.length > 0
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
    async findByCategory(categoryName) {
        const all = await this.findAll();
        return all.filter((s) => s.category.toLowerCase() === categoryName.toLowerCase());
    }
    async findOne(id) {
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
        const avgRating = reviews.length > 0
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
};
SkillsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SkillsService);
export { SkillsService };
//# sourceMappingURL=skills.service.js.map