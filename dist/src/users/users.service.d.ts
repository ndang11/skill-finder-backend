import { PrismaService } from '../prisma/prisma.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class UsersService {
    private readonly prisma;
    private readonly cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        avatarUrl: string | null;
        bio: string | null;
        location: string | null;
        whatsappNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        avatarUrl: string | null;
        bio: string | null;
        location: string | null;
        whatsappNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProfileDto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        avatarUrl: string | null;
        bio: string | null;
        location: string | null;
        whatsappNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAvatar(userId: string, file: Express.Multer.File): Promise<{
        id: string;
        email: string;
        fullName: string;
        avatarUrl: string | null;
        bio: string | null;
        location: string | null;
        whatsappNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
