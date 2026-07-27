import { PrismaService } from '../prisma/prisma.service.js';
import type { SearchProfessionalDto } from './dto/search-professional.dto.js';
import type { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, categoryId: string, location: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        avatarUrl: string | null;
        bio: string | null;
        location: string | null;
        whatsappNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(searchDto: SearchProfessionalDto): Promise<{
        id: any;
        userId: any;
        fullName: any;
        avatarUrl: any;
        category: any;
        location: any;
        bio: any;
        skills: any;
        averageRating: number;
        completedJobs: any;
        whatsappNumber: any;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        userId: any;
        fullName: any;
        avatarUrl: any;
        category: any;
        location: any;
        bio: any;
        skills: any;
        averageRating: number;
        completedJobs: any;
        whatsappNumber: any;
    }>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<{
        id: any;
        userId: any;
        fullName: any;
        avatarUrl: any;
        category: any;
        location: any;
        bio: any;
        skills: any;
        averageRating: number;
        completedJobs: any;
        whatsappNumber: any;
    }>;
    getAverageRating(professionalId: string): Promise<number>;
    private mapUserToProfessionalProfile;
}
