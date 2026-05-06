"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminGetContactMessages = exports.adminGetArchivedCourses = exports.adminGetPendingCourses = exports.adminGetCourseById = exports.updateCourse = exports.deleteCourse = exports.activateCourse = exports.addCourse = exports.getCourse = exports.getCategory = exports.addCategory = exports.assignRoleService = exports.adminGetStatistics = void 0;
const prisma_1 = require("../../lib/prisma");
const adminGetStatistics = async () => {
    const [totalUsers, totalCourses, totalCategories] = await Promise.all([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.course.count(),
        prisma_1.prisma.category.count(),
    ]);
    return {
        totalUsers,
        totalCourses,
        totalCategories
    };
};
exports.adminGetStatistics = adminGetStatistics;
const assignRoleService = async (userId, roleName) => {
    // find role
    const role = await prisma_1.prisma.role.findUnique({
        where: { name: roleName },
    });
    if (!role) {
        throw new Error("Role not found");
    }
    // check if already assigned
    const existingRole = await prisma_1.prisma.userRole.findUnique({
        where: {
            userId_roleId: {
                userId,
                roleId: role.id,
            },
        },
    });
    if (existingRole) {
        throw new Error("User already has this role");
    }
    // assign role
    const userRole = await prisma_1.prisma.userRole.create({
        data: {
            userId,
            roleId: role.id,
        },
        include: {
            role: true,
        },
    });
    return userRole;
};
exports.assignRoleService = assignRoleService;
const addCategory = async (name, slug) => {
    const existingCategory = await prisma_1.prisma.category.findFirst({
        where: { name },
    });
    if (existingCategory) {
        throw new Error("Category already exists");
    }
    const category = await prisma_1.prisma.category.create({
        data: { name, slug },
    });
    return category;
};
exports.addCategory = addCategory;
const getCategory = async () => {
    const category = await prisma_1.prisma.category.findMany();
    return category;
};
exports.getCategory = getCategory;
const getCourse = async () => {
    const course = await prisma_1.prisma.course.findMany();
    return course;
};
exports.getCourse = getCourse;
const addCourse = async (data) => {
    const course = await prisma_1.prisma.course.create({
        data: {
            categoryId: data.category, // 🔥 important mapping
            title: data.title,
            slug: data.slug,
            briefDefinition: data.briefDefinition,
            prerequisite: data.prerequisite,
            keyAreas: data.keyAreas,
            outcomes: data.outcomes,
            jobRoles: data.jobRoles,
            industries: data.industries,
            duration: data.duration,
            cost: data.cost,
            paid: data.paid,
            thumbnail: data.thumbnail,
            level: data.level,
            createdBy: data.createdBy,
        },
    });
    return course;
};
exports.addCourse = addCourse;
const activateCourse = async (id) => {
    const course = await prisma_1.prisma.course.update({
        where: { id },
        data: {
            status: "published"
        }
    });
    return course;
};
exports.activateCourse = activateCourse;
const deleteCourse = async (id) => {
    const course = await prisma_1.prisma.course.delete({
        where: { id }
    });
    return course;
};
exports.deleteCourse = deleteCourse;
const updateCourse = async (id, data) => {
    const course = await prisma_1.prisma.course.update({
        where: { id },
        data: {
            categoryId: data.category,
            title: data.title,
            slug: data.slug,
            briefDefinition: data.briefDefinition,
            prerequisite: data.prerequisite,
            keyAreas: data.keyAreas,
            outcomes: data.outcomes,
            jobRoles: data.jobRoles,
            industries: data.industries,
            duration: data.duration,
            cost: data.cost,
            paid: data.paid,
            thumbnail: data.thumbnail, // overwrite if new file uploaded
            level: data.level,
        },
    });
    return course;
};
exports.updateCourse = updateCourse;
const adminGetCourseById = async (id) => {
    const course = await prisma_1.prisma.course.findUnique({
        where: { id },
    });
    return course;
};
exports.adminGetCourseById = adminGetCourseById;
const adminGetPendingCourses = async () => {
    const courses = await prisma_1.prisma.course.findMany({
        where: { status: "draft" },
        include: { category: true }
    });
    return courses;
};
exports.adminGetPendingCourses = adminGetPendingCourses;
const adminGetArchivedCourses = async () => {
    const courses = await prisma_1.prisma.course.findMany({
        where: { status: "archived" },
        include: { category: true }
    });
    return courses;
};
exports.adminGetArchivedCourses = adminGetArchivedCourses;
const adminGetContactMessages = async () => {
    const contacts = await prisma_1.prisma.contact.findMany();
    return contacts;
};
exports.adminGetContactMessages = adminGetContactMessages;
