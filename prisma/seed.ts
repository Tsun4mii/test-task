import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedUsers = async () => {
  const transactionArray = [
    prisma.user.create({ data: { name: 'Yuri', surname: 'Shust' } }),
    prisma.user.create({ data: { name: 'John', surname: 'Doe' } }),
  ];

  return prisma.$transaction(transactionArray);
};

const seedProducts = async () => {
  const transactionArray = [
    prisma.product.create({
      data: { title: 'Sony Alpha a7', description: 'Cool camera', price: 6432 },
    }),
    prisma.product.create({
      data: {
        title: 'Sony Alpha a123123',
        description: 'Super camera',
        price: 9999,
      },
    }),
  ];
  return prisma.$transaction(transactionArray);
};

async function main() {
  await seedUsers();
  await seedProducts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
