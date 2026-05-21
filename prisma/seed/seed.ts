import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    "password123",
    10
  );

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@medvirtuoso.com",
      password: hashedPassword,
      role: Role.OPERATOR,
    },
  });

  console.log("Seed user created");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });