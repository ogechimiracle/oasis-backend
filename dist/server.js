"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_1 = require("./lib/prisma");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        await prisma_1.prisma.$connect();
        console.log("✅ Database connected to PostgreSQL");
        app_1.default.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}
startServer();
