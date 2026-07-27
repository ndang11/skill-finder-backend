var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
const STATIC_CATEGORIES = [
    { id: '1', name: 'Solar Installation', slug: 'solar-installation' },
    { id: '2', name: 'Hairdressing', slug: 'hairdressing' },
    { id: '3', name: 'Mechanics', slug: 'mechanics' },
    { id: '4', name: 'Tailoring / Fashion', slug: 'tailoring-fashion' },
    { id: '5', name: 'Plumbing', slug: 'plumbing' },
    { id: '6', name: 'Electrical', slug: 'electrical' },
    { id: '7', name: 'Carpentry', slug: 'carpentry' },
    { id: '8', name: 'Painting', slug: 'painting' },
    { id: '9', name: 'Photography', slug: 'photography' },
    { id: '10', name: 'Catering / Chef', slug: 'catering-chef' },
    { id: '11', name: 'Software Engineering', slug: 'software-engineering' },
    { id: '12', name: 'Other', slug: 'other' },
];
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        throw new ConflictException('Dynamic category creation is not supported.');
    }
    async findAll() {
        return STATIC_CATEGORIES;
    }
};
CategoriesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CategoriesService);
export { CategoriesService };
//# sourceMappingURL=categories.service.js.map