import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString =
  process.env.DIRECT_URL ?? process.env.SUPABASE_DB_URL ?? '';

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: 'Solar Installer', slug: 'solar-installer' },
  { name: 'Hairdresser', slug: 'hairdresser' },
  { name: 'Mechanic', slug: 'mechanic' },
  { name: 'Tailor / Fashion Designer', slug: 'tailor-fashion-designer' },
  { name: 'Plumber', slug: 'plumber' },
  { name: 'Electrician', slug: 'electrician' },
  { name: 'Carpenter', slug: 'carpenter' },
  { name: 'Painter', slug: 'painter' },
  { name: 'Photographer', slug: 'photographer' },
  { name: 'Catering / Chef', slug: 'catering-chef' },
];

async function main() {
  console.log('🌱  Seeding categories...');

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
    console.log(`   ✔  ${category.name}`);
  }

  console.log('✅  Seeding complete!');
}

main()
  .catch((err) => {
    console.error('❌  Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
