var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SupabaseAuthGuard_1;
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
let SupabaseAuthGuard = SupabaseAuthGuard_1 = class SupabaseAuthGuard extends AuthGuard('supabase') {
    logger = new Logger(SupabaseAuthGuard_1.name);
    handleRequest(err, user, info) {
        if (err || !user) {
            const message = err?.message ||
                info?.message ||
                'Invalid or expired token';
            this.logger.warn(`JWT verification failed: ${message}`);
            if (err instanceof Error) {
                throw err;
            }
            throw new UnauthorizedException(message);
        }
        return user;
    }
};
SupabaseAuthGuard = SupabaseAuthGuard_1 = __decorate([
    Injectable()
], SupabaseAuthGuard);
export { SupabaseAuthGuard };
//# sourceMappingURL=supabase-auth.guard.js.map