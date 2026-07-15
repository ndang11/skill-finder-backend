import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';

/**
 * SupabaseStrategy verifies incoming Bearer JWTs using your Supabase
 * project's public JWKS endpoint (RS256). This works for all Supabase
 * projects regardless of whether they use HS256 or RS256 signing.
 *
 * The JWKS endpoint: https://<project>.supabase.co/auth/v1/.well-known/jwks.json
 *
 * The client fetches the public RSA key from the JWKS endpoint, caches it,
 * and uses it to verify token signatures — no shared secret required.
 */
@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  private readonly logger = new Logger(SupabaseStrategy.name);

  constructor(configService: ConfigService) {
    const jwksUri = configService.getOrThrow<string>('SUPABASE_JWKS_URL');

    super({
      // Extract the Bearer token from the Authorization header.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Use the JWKS endpoint to fetch the RSA public key for RS256 verification.
      // jwks-rsa will cache keys and auto-rotate when Supabase rolls them.
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri,
      }),

      // Supabase issues RS256 tokens by default for all new projects.
      algorithms: ['RS256'],
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
