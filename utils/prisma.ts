import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export const getPrismaClient = () => {
  if (prisma) {
    return prisma;
  }
  prisma = new PrismaClient();
  return prisma;
};

export const transformNumber = (int: number): number => {
  const trans = parseFloat(`${int}.00`);
  return trans;
};
