import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  const users = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password,
      role: Role.ADMIN,
    },
    {
      name: "Sales",
      email: "sales@gmail.com",
      password: await bcrypt.hash("sales123", 10),
      role: Role.SALES,
    },
    {
      name: "Warehouse",
      email: "warehouse@gmail.com",
      password: await bcrypt.hash("warehouse123", 10),
      role: Role.WAREHOUSE,
    },
    {
      name: "Accounts",
      email: "accounts@gmail.com",
      password: await bcrypt.hash("accounts123", 10),
      role: Role.ACCOUNTS,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: user,
    });
  }

  console.log("✅ Users inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });