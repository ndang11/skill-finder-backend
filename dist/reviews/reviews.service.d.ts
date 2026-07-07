import { CreateReviewDto } from './dto/create-review.dto';
export interface Review {
    id: string;
    professionalId: string;
    customerId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
}
export declare class ReviewsService {
    private reviews;
    create(customerId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    findByProfessional(professionalId: string): Promise<Review[]>;
    getAverageRating(professionalId: string): Promise<number>;
}
