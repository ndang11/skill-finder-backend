import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  // Placeholder database service.
  // When ready to use Prisma, install @prisma/client, run prisma init, and extend PrismaClient.
  async onModuleInit() {
    // Connect to database
  }

  async onModuleDestroy() {
    // Disconnect from database
  }
}
