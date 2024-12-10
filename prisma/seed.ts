import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Add development data here
    const testUser = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            name: 'Test User'
        },
    });

    console.log({ testUser });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 