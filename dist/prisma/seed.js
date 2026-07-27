import { PrismaPg } from '@prisma/adapter-pg';
import { BookingStatus, PrismaClient } from '@prisma/client';
import 'dotenv/config';
const connectionString = process.env.DIRECT_URL ?? process.env.SUPABASE_DB_URL ?? '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
    console.log('🌱 Starting database seed...');
    await prisma.review.deleteMany();
    await prisma.savedSkill.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.user.deleteMany();
    console.log('   ✔  Cleared existing records');
    const client = await prisma.user.create({
        data: {
            email: 'client@example.com',
            fullName: 'Alex Johnson',
            avatarUrl: 'https://res.cloudinary.com/demo/image/upload/v1/avatar1.jpg',
        },
    });
    console.log(`   ✔  Created user: ${client.fullName}`);
    const provider = await prisma.user.create({
        data: {
            email: 'provider@example.com',
            fullName: 'Sarah Dev',
            avatarUrl: 'https://res.cloudinary.com/demo/image/upload/v1/avatar2.jpg',
        },
    });
    console.log(`   ✔  Created user: ${provider.fullName}`);
    const skill = await prisma.skill.create({
        data: {
            title: 'Full-Stack Web Development Coaching',
            description: 'Master React, NestJS, and Prisma with 1-on-1 mentorship.',
            category: 'Software Engineering',
            price: 50.0,
            providerId: provider.id,
        },
    });
    console.log(`   ✔  Created skill: ${skill.title}`);
    await prisma.savedSkill.create({
        data: {
            userId: client.id,
            skillId: skill.id,
        },
    });
    console.log('   ✔  Created saved skill (bookmark)');
    const booking = await prisma.booking.create({
        data: {
            clientId: client.id,
            providerId: provider.id,
            skillId: skill.id,
            status: BookingStatus.COMPLETED,
            scheduledAt: new Date(Date.now() - 86_400_000),
            notes: 'Focus on setting up Prisma with ES Modules.',
        },
    });
    console.log(`   ✔  Created booking (status: ${booking.status})`);
    await prisma.review.create({
        data: {
            bookingId: booking.id,
            authorId: client.id,
            receiverId: provider.id,
            skillId: skill.id,
            rating: 5,
            comment: 'Excellent session! Super clear explanation of NestJS and Prisma.',
        },
    });
    console.log('   ✔  Created review');
    console.log('\n✅ Seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map