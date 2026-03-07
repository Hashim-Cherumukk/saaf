// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

// 1. Setup the connection pool using the standard Postgres driver
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Initialize the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the Prisma Client
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Connection established via Adapter. Start seeding...");
  
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Signature White Qamees",
        description: "A timeless masterpiece crafted from premium Egyptian cotton.",
        price: 85.00,
        category: "qamees",
        image: "/hero.png", 
        sizes: ["S", "M", "L", "XL"],
        isFeatured: true,
      },
      {
        name: "Oud Royale",
        description: "Deep, woody notes with a hint of spicy amber.",
        price: 120.00,
        category: "fragrance",
        image: "/hero.png", 
        sizes: ["50ml", "100ml"],
        isFeatured: true,
      }
    ]
  });

  console.log("✅ Seeding finished! Your Neon database is now populated.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Important: Close the pool so the script exits
  });