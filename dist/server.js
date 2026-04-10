import "dotenv/config";
import { prisma } from "./lib/prisma";
import app from './app';
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        await prisma.$connect();
        console.log("✅ Database connected to PostgreSQL");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}
startServer();
