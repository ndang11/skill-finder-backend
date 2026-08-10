import { PrismaService } from '../prisma/prisma.service.js';
export declare class SkillsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        title: string;
        description: string;
        category: string;
        price: number | null;
        providerId: string;
        providerName: string;
        providerAvatar: string | null;
        providerLocation: string;
        providerWhatsapp: string;
        averageRating: number;
        createdAt: Date;
    }[]>;
    findByCategory(categoryName: string): Promise<{
        id: string;
        title: string;
        description: string;
        category: string;
        price: number | null;
        providerId: string;
        providerName: string;
        providerAvatar: string | null;
        providerLocation: string;
        providerWhatsapp: string;
        averageRating: number;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        category: string;
        price: number | null;
        providerId: string;
        providerName: string;
        providerAvatar: string | null;
        providerLocation: string;
        providerWhatsapp: string;
        averageRating: number;
        createdAt: Date;
    }>;
}
