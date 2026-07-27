import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(customerId: string, createReviewDto: CreateReviewDto): Promise<void>;
    findByProfessional(professionalId: string): Promise<never[]>;
    getAverageRating(professionalId: string): Promise<number>;
}
