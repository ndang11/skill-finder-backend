import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateCategoryDto } from './dto/create-category.dto.js';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        slug: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
    }[]>;
}
