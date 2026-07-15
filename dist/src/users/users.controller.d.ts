import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    getProfile(userId: string): Promise<{
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
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<{
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
