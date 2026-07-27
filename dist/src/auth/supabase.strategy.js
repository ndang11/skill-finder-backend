var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SupabaseStrategy_1;
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';
let SupabaseStrategy = SupabaseStrategy_1 = class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
    logger = new Logger(SupabaseStrategy_1.name);
    constructor(configService) {
        const jwksUri = configService.getOrThrow('SUPABASE_JWKS_URL');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri,
            }),
            algorithms: ['RS256', 'ES256'],
            ignoreExpiration: false,
        });
    }
    validate(payload) {
        if (!payload?.sub) {
            this.logger.warn('JWT payload missing sub claim');
            throw new UnauthorizedException('Invalid token payload');
        }
        return {
            id: payload.sub,
            email: payload.email ?? '',
            role: payload.user_metadata?.role ??
                payload.app_metadata?.role ??
                'customer',
        };
    }
};
SupabaseStrategy = SupabaseStrategy_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SupabaseStrategy);
export { SupabaseStrategy };
//# sourceMappingURL=supabase.strategy.js.map