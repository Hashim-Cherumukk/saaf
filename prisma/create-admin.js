// prisma/create-admin.js
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Use a password you will remember!
  const password = "YourSecurePassword123"; 
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await prisma.user.upsert({
    where: { email: "admin@saaf.com" },
    update: {},
    create: {
      email: "admin@saaf.com",
      name: "SAAF Admin",
      password: hashedPassword,
    },
  });
  console.log("✅ Admin user created!");
  console.log("Email: admin@saaf.com");
  console.log("Password: " + password);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });