declare const SupabaseAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class SupabaseAuthGuard extends SupabaseAuthGuard_base {
    private readonly logger;
    handleRequest<TUser = any>(err: unknown, user: unknown, info: unknown): TUser;
}
export {};
