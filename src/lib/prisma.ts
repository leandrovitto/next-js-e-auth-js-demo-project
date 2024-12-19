import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default async function verifyDatabaseConnection() {
	try {
		await prisma.$connect();
		console.log("Database connected successfully");
	} catch (error) {
		console.error("Failed to connect to the database:", error);
		throw error;
	}
}
