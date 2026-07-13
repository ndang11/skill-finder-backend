import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    // DIRECT_URL is used for migrations — direct Supabase connection bypassing pooler.
    // DATABASE_URL (prisma+postgres://) is used at runtime via PrismaPg adapter in PrismaService.
    url: env('DIRECT_URL'),
  },
});
