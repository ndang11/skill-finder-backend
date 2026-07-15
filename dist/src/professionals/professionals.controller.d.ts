import { ProfessionalsService } from './professionals.service.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsController {
    private readonly professionalsService;
    constructor(professionalsService: ProfessionalsService);
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
}
