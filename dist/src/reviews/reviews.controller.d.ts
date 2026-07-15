import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
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
