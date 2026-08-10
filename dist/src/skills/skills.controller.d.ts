import { SkillsService } from './skills.service.js';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
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
    findByCategory(category: string): Promise<{
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
