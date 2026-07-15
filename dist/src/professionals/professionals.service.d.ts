import { PrismaService } from '../prisma/prisma.service.js';
import type { SearchProfessionalDto } from './dto/search-professional.dto.js';
import type { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, categoryId: string, location: string): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        };
        user: {
            id: string;
            fullname: string;
            username: string;
            email: string;
            phoneNumber: string | null;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            isVerifiedProfessional: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        categoryId: string;
        location: string;
        skills: string[];
        completedJobs: number;
    }>;
    findAll(searchDto: SearchProfessionalDto): Promise<({
        category: {
            id: string;
            name: string;
            slug: string;
        };
        user: {
            id: string;
            fullname: string;
            username: string;
            avatarUrl: string | null;
            isVerifiedProfessional: boolean;
        };
        reviews: {
            rating: number;
        }[];
    } & {
        id: string;
        userId: string;
        categoryId: string;
        location: string;
        skills: string[];
        completedJobs: number;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        };
        user: {
            id: string;
            fullname: string;
            username: string;
            avatarUrl: string | null;
            isVerifiedProfessional: boolean;
        };
        reviews: ({
            customer: {
                id: string;
                fullname: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            comment: string | null;
            createdAt: Date;
            professionalId: string;
            customerId: string;
            rating: number;
        })[];
    } & {
        id: string;
        userId: string;
        categoryId: string;
        location: string;
        skills: string[];
        completedJobs: number;
    }>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        };
        user: {
            id: string;
            fullname: string;
            username: string;
            email: string;
            phoneNumber: string | null;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            isVerifiedProfessional: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        categoryId: string;
        location: string;
        skills: string[];
        completedJobs: number;
    }>;
    getAverageRating(professionalId: string): Promise<number>;
}
