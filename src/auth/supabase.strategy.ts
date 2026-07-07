import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseStrategy {
  // Placeholder strategy.
  // When ready to verify Supabase JWTs, install @nestjs/passport passport passport-jwt
  // and extend PassportStrategy(Strategy) with your Supabase JWT Secret.
  validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.user_metadata?.role || 'customer',
    };
  }
}
