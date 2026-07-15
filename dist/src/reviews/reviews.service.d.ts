import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(customerId: string, createReviewDto: CreateReviewDto): Promise<{
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
    }>;
    findByProfessional(professionalId: string): Promise<({
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
    })[]>;
    getAverageRating(professionalId: string): Promise<number>;
}
