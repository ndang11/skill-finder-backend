import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('supabase') {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  override handleRequest<TUser = any>(
    err: unknown,
    user: unknown,
    info: unknown,
  ): TUser {
    if (err || !user) {
      const message =
        (err as Error | undefined)?.message ||
        (info as Error | undefined)?.message ||
        'Invalid or expired token';
      this.logger.warn(`JWT verification failed: ${message}`);
      if (err instanceof Error) {
        throw err;
      }
      throw new UnauthorizedException(message);
    }
    return user as TUser;
  }
}
