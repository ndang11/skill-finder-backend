import { BookmarksService } from './bookmarks.service.js';
export declare class BookmarksController {
    private readonly bookmarksService;
    constructor(bookmarksService: BookmarksService);
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
    checkIsBookmarked(userId: string, skillId: string): Promise<{
        isBookmarked: boolean;
    }>;
    addBookmark(userId: string, skillId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        skillId: string;
    }>;
    removeBookmark(userId: string, skillId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
