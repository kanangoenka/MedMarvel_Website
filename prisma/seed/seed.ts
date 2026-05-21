import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    "password123",
    10
  );

  await prisma.user.upsert({
    where: {
      email: "admin@medvirtuoso.com",
    },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@medvirtuoso.com",
      password: hashedPassword,
      role: Role.OPERATOR,
    },
  });

  await prisma.user.upsert({
    where: {
      email: "client@medvirtuoso.com",
    },
    update: {},
    create: {
      name: "Client User",
      email: "client@medvirtuoso.com",
      password: hashedPassword,
      role: Role.CLIENT,
    },
  });

  console.log("Seed users created");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });