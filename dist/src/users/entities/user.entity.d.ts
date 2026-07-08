export declare class User {
    id: string;
    fullname: string;
    username: string;
    email?: string;
    phoneNumber: string;
    role: 'customer' | 'professional' | 'admin';
    avatarUrl?: string;
    isVerifiedProfessional: boolean;
    createdAt: Date;
}
