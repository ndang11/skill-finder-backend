import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';

/**
 * SupabaseStrategy verifies incoming Bearer JWTs using your Supabase
 * project's public JWKS endpoint.
 * Supabase tokens can be RS256 or ES256.
 */
@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  private readonly logger = new Logger(SupabaseStrategy.name);

  constructor(configService: ConfigService) {
    const jwksUri = configService.getOrThrow<string>('SUPABASE_JWKS_URL');

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

  /**
   * Called after the JWT is successfully verified.
   * The returned value is attached to request.user by Passport.
   */
  validate(payload: {
    sub: string;
    email?: string;
    user_metadata?: { role?: string; fullname?: string };
    app_metadata?: { role?: string };
  }) {
    if (!payload?.sub) {
      this.logger.warn('JWT payload missing sub claim');
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      id: payload.sub,
      email: payload.email ?? '',
      // Role may be in user_metadata (set during signUp) or app_metadata (set server-side).
      role:
        payload.user_metadata?.role ??
        payload.app_metadata?.role ??
        'customer',
    };
  }
}
