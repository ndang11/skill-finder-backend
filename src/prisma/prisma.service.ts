import { Injectable, Logger } from '@nestjs/common';
import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * PrismaService wraps PrismaClient and hooks into the NestJS lifecycle.
 *
 * Prisma v7 requires a Driver Adapter for runtime connections.
 * We use @prisma/adapter-pg with the SUPABASE_DB_URL (standard postgresql://)
 * for runtime queries. The prisma+postgres:// URL in DATABASE_URL is only
 * used by the Prisma local dev server proxy (prisma dev command).
 *
 * For migrations, prisma.config.ts uses DIRECT_URL (session-mode pooler).
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    // Use the standard PostgreSQL connection string for the PG adapter.
    // Falls back to DATABASE_URL if SUPABASE_DB_URL is not set.
    const connectionString =
      configService.get<string>('SUPABASE_DB_URL') ??
      configService.getOrThrow<string>('DATABASE_URL');

    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connection established');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database connection closed');
  }
}
