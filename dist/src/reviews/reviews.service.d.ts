import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(customerId: string, createReviewDto: CreateReviewDto): Promise<{
        skill: {
            id: string;
            title: string;
            category: string;
        } | null;
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        skillId: string | null;
        rating: number;
        comment: string;
        bookingId: string | null;
        authorId: string;
        receiverId: string;
    }>;
    findByProfessional(professionalId: string): Promise<({
        skill: {
            id: string;
            title: string;
            category: string;
        } | null;
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        skillId: string | null;
        rating: number;
        comment: string;
        bookingId: string | null;
        authorId: string;
        receiverId: string;
    })[]>;
    findByAuthor(authorId: string): Promise<({
        skill: {
            id: string;
            title: string;
            category: string;
        } | null;
        receiver: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        skillId: string | null;
        rating: number;
        comment: string;
        bookingId: string | null;
        authorId: string;
        receiverId: string;
    })[]>;
    getAverageRating(professionalId: string): Promise<number>;
}
