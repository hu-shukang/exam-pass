import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });
prisma.$on('query', (event) => {
  console.info(`Prisma Query: ${event.query}`);
  console.info(`Prisma Params: ${event.params}`);
  console.info(`Prisma Duration: ${event.duration}ms`);
});
