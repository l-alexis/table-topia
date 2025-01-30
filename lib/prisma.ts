import { createRequire } from "module";
const require = createRequire(import.meta.url);

let prisma;

export const getPrismaClient = () => {
  if (!prisma) {
    const { PrismaClient } = require("@prisma/client");

    if (process.env.NODE_ENV === "production") {
      prisma = new PrismaClient();
    } else {
      if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
      }
      prisma = (global as any).prisma;
    }
  }
  return prisma;
};
