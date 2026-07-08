import { Module } from '@nestjs/common';
import { SupabaseStrategy } from './supabase.strategy.js';

@Module({
  providers: [SupabaseStrategy],
  exports: [SupabaseStrategy],
})
export class AuthModule {}
