import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async ({ email, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser)
        throw new Error("User already exists");
    const passwordHash = await bcrypt.hash(password, 10);
    // create user first
    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
        },
    });
    //get STUDENT role
    const studentRole = await prisma.role.findUnique({
        where: { name: "STUDENT" },
    });
    if (!studentRole)
        throw new Error("Student role missing");
    //assign default role
    await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: studentRole.id,
        },
    });
    return user;
};
export const loginUser = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
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
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
        throw new Error("Invalid credentials");
    //extract role names
    const roleNames = user.roles.map(r => r.role.name);
    const token = jwt.sign({
        userId: user.id,
        email: user.email,
        roles: roleNames, //MULTIPLE ROLES
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, user };
};
