import { Injectable } from '@nestjs/common';
import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Connect to PostgreSQL when the application starts
  async onModuleInit() {
    await this.$connect();
  }

  // Gracefully disconnect from PostgreSQL when the application shuts down
  async onModuleDestroy() {
    await this.$disconnect();
  }
}