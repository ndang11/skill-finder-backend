import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('supabase') {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  canActivate(context: import('@nestjs/common').ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payloadBase64 = token.split('.')[0];
        const header = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
        this.logger.debug(`JWT Header: ${JSON.stringify(header)}`);
      } catch (e) {}
    }
    return super.canActivate(context);
  }

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
