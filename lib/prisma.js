const { PrismaClient } = require('@prisma/client');

export const db = globalThis.prisma || new PrismaClient();

//if the environment is not prod only then we store the prisma in global object
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}