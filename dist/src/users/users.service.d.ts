import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { User } from './entities/user.entity.js';
export declare class UsersService {
    private users;
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(id: string): Promise<User>;
    update(id: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    verifyProfessional(id: string): Promise<User>;
}
