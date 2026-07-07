import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(customerId: string, createReviewDto: CreateReviewDto): Promise<import("./reviews.service").Review>;
    findByProfessional(professionalId: string): Promise<import("./reviews.service").Review[]>;
    getAverageRating(professionalId: string): Promise<number>;
}
