import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        avatarUrl: string | null;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        avatarUrl: string | null;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        avatarUrl: string | null;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        id: string;
        email: string;
        avatarUrl: string | null;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
