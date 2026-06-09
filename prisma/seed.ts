import {
  PrismaClient,
  UserRole,
} from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword =
    await bcrypt.hash(
      "admin123",
      10
    );

  // Create Super Admin
  await prisma.user.create({
    data: {
      name: "MedMarvel Super Admin",

      email:
        "admin@medmarvel.com",

      password:
        hashedPassword,

      role:
        UserRole.SUPER_ADMIN,
    },
  });

  console.log(
    "Super Admin created successfully"
  );
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });