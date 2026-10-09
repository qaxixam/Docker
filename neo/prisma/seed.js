// prisma/seed.js
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding started...');

    // 1. Single user create karo
    const user1 = await prisma.user.create({
        data: {
            email: 'rahul@example.com',
            name: 'Rahul Sharma',
            age: 25,
        },
    });
    console.log('✅ User created:', user1);

    // 2. Multiple users ek saath create karo
    const users = await prisma.user.createMany({
        data: [
            { email: 'priya@example.com', name: 'Priya Patel', age: 22 },
            { email: 'amit@example.com', name: 'Amit Kumar', age: 28 },
            { email: 'sneha@example.com', name: 'Sneha Verma', age: 30 },
        ],
        skipDuplicates: true,
    });
    console.log(`✅ ${users.count} users created`);

    // 3. Post create karo (user ke saath relation)
    const post1 = await prisma.post.create({
        data: {
            title: 'Prisma with Neon',
            content: 'Ye mera pehla post hai Prisma aur Neon database ke saath!',
            published: true,
            authorId: user1.id,
        },
    });
    console.log('✅ Post created:', post1);

    // 4. Nested create - user ke saath uske posts bhi create karo
    const userWithPosts = await prisma.user.create({
        data: {
            email: 'vikas@example.com',
            name: 'Vikas Singh',
            age: 27,
            posts: {
                create: [
                    { title: 'First Post', content: 'Hello World', published: true },
                    { title: 'Second Post', content: 'Learning Prisma', published: false },
                ],
            },
        },
        include: {
            posts: true,
        },
    });
    console.log('✅ User with posts:', userWithPosts);

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });