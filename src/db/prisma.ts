import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./client/client";
import "dotenv/config"
const connectionString = process.env.DATABASE_URL
const adapter = new PrismaPg({
    connectionString: connectionString
})
const prisma = new PrismaClient({adapter});

export default prisma