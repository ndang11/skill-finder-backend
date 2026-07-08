import { Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    // Placeholder verification logic.
    // In production, you will decode the Supabase JWT using passport-jwt or supabase-js.
    if (!authHeader) {
      return false;
    }

    // Example mock user attached to the request for dev scaffolding
    request.user = {
      id: 'mock-user-1',
      email: 'user@example.com',
      role: 'professional',
    };
    
    return true;
  }
}
