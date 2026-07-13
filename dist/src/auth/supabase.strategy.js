var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
let SupabaseStrategy = class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
    constructor(configService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow('SUPABASE_JWT_SECRET'),
            algorithms: ['HS256'],
            ignoreExpiration: false,
        });
    }
    validate(payload) {
        return {
            id: payload.sub,
            email: payload.email ?? '',
            role: payload.user_metadata?.role ?? 'customer',
        };
    }
};
SupabaseStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SupabaseStrategy);
export { SupabaseStrategy };
//# sourceMappingURL=supabase.strategy.js.map