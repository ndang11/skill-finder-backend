// prisma.config.ts
import 'dotenv/config'; // <-- CRITICAL: This loads your DATABASE_URL from your .env file
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DIRECT_URL'), // Needs the direct PostgreSQL connection (port 5432) for migrations
  },
});