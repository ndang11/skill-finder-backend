import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(customerId: string, createReviewDto: CreateReviewDto): Promise<import("./reviews.service.js").Review>;
    findByProfessional(professionalId: string): Promise<import("./reviews.service.js").Review[]>;
    getAverageRating(professionalId: string): Promise<number>;
}
