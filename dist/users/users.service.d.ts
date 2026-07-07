import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private users;
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(id: string): Promise<User>;
    update(id: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    verifyProfessional(id: string): Promise<User>;
}
