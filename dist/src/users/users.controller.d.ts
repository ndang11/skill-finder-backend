import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity.js").User>;
    getProfile(userId: string): Promise<import("./entities/user.entity.js").User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<import("./entities/user.entity.js").User>;
}
