import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(customerId: string, createReviewDto: CreateReviewDto): Promise<void>;
    findByProfessional(professionalId: string): Promise<never[]>;
    getAverageRating(professionalId: string): Promise<number>;
}
