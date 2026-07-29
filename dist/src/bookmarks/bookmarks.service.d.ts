import { PrismaService } from '../prisma/prisma.service.js';
export declare class BookmarksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBookmarks(userId: string): Promise<{
        id: string;
        skillId: string;
        createdAt: string;
        title: string;
        description: string;
        category: string;
        price: number | null;
        provider: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
            location: string;
            whatsappNumber: string | null;
            bio: string | null;
            averageRating: number;
            totalReviews: number;
        };
    }[]>;
    addBookmark(userId: string, skillId: string): Promise<{
        id: string;
        userId: string;
        skillId: string;
        createdAt: Date;
    }>;
    removeBookmark(userId: string, skillId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    checkIsBookmarked(userId: string, skillId: string): Promise<{
        isBookmarked: boolean;
    }>;
}
