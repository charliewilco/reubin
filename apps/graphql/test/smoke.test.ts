import { PrismaClient } from "@prisma/client";

describe("example test with Prisma Client", () => {
  let prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("test query", async () => {
    await prisma.entry.findMany();
  });
});
