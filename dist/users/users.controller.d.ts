import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    getProfile(userId: string): Promise<import("./entities/user.entity").User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<import("./entities/user.entity").User>;
}
