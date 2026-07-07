export declare class CreateUserDto {
    id: string;
    fullname: string;
    username: string;
    email?: string;
    phoneNumber: string;
    role: 'customer' | 'professional' | 'admin';
    avatarUrl?: string;
}
