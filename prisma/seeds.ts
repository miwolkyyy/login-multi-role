import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Demo accounts must not be seeded in production.");
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL must be set before seeding.");
  }

  const databaseHost = new URL(databaseUrl).hostname;
  const isLocalDatabase = ["localhost", "127.0.0.1", "::1"].includes(databaseHost);
  if (!isLocalDatabase && process.env.ALLOW_REMOTE_DEMO_SEED !== "true") {
    throw new Error(
      "The configured database is remote. Set ALLOW_REMOTE_DEMO_SEED=true only if you intend to add demo accounts there.",
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set before seeding.");
  }

  const [adminPasswordHash, demoUserPasswordHash] = await Promise.all([
    hash(adminPassword, 12),
    hash("UserDemo123!", 12),
  ]);

  await prisma.user.upsert({
    where: {
      email: adminEmail,
    },

    update: {
      name: "Restaurant Admin",
      role: "ADMIN",
    },

    create: {
      name: "Restaurant Admin",
      email: adminEmail,
      password: adminPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "demo.user@restaurant.local",
    },
    update: {
      name: "Demo User",
      password: demoUserPasswordHash,
      role: "USER",
    },
    create: {
      name: "Demo User",
      email: "demo.user@restaurant.local",
      password: demoUserPasswordHash,
      role: "USER",
    },
  });

  console.log("Admin and demo user accounts are ready.");
}

main()
  .catch((error: unknown) => {
    console.error("Failed to seed accounts:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
