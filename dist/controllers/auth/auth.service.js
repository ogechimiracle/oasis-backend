"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const prisma_1 = require("../../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async ({ email, password }) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser)
        throw new Error("User already exists");
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    // create user first
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            passwordHash,
        },
    });
    //get STUDENT role
    const studentRole = await prisma_1.prisma.role.findUnique({
        where: { name: "STUDENT" },
    });
    if (!studentRole)
        throw new Error("Student role missing");
    //assign default role
    await prisma_1.prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: studentRole.id,
        },
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async ({ email, password }) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
        include: {
            roles: {
                include: {
                    role: true,
                },
            },
        },
    });
    if (!user)
        throw new Error("User with such credential not found");
    const isMatch = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isMatch)
        throw new Error("Invalid credentials");
    //extract role names
    const roleNames = user.roles.map(r => r.role.name);
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
        roles: roleNames, //MULTIPLE ROLES
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, user };
};
exports.loginUser = loginUser;
