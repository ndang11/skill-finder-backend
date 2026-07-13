import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  constructor(configService: ConfigService) {
    super({
      // Extract the Bearer token from the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Verify using Supabase project's secret JWT signing key
      secretOrKey: configService.getOrThrow<string>('SUPABASE_JWT_SECRET'),
      algorithms: ['HS256'],
      ignoreExpiration: false,
    });
  }

  /**
   * Called after the JWT is verified. The returned value is attached
   * to request.user by Passport.
   */
  validate(payload: {
    sub: string;
    email?: string;
    user_metadata?: { role?: string };
  }) {
    return {
      id: payload.sub,
      email: payload.email ?? '',
      role: payload.user_metadata?.role ?? 'customer',
    };
  }
}
