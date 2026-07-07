export class CreateReviewDto {
  professionalId: string;
  rating: number; // 1–5
  comment?: string;
}
