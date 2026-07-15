import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        fullname: string;
        username: string;
        email: string;
        phoneNumber: string | null;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        isVerifiedProfessional: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        professionalProfile: {
            id: string;
            userId: string;
            categoryId: string;
            location: string;
            skills: string[];
            completedJobs: number;
        } | null;
    } & {
        id: string;
        fullname: string;
        username: string;
        email: string;
        phoneNumber: string | null;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        isVerifiedProfessional: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProfileDto: UpdateProfileDto): Promise<{
        id: string;
        fullname: string;
        username: string;
        email: string;
        phoneNumber: string | null;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        isVerifiedProfessional: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
