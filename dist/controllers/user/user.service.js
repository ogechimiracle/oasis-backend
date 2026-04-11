"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveContactMessage = exports.getCourses = exports.getCourseById = void 0;
const prisma_1 = require("../../lib/prisma");
const getCourseById = async (courseId) => {
    const course = await prisma_1.prisma.course.findUnique({
        where: { id: courseId },
        include: {
            category: true,
        },
    });
    return course;
};
exports.getCourseById = getCourseById;
const getCourses = async () => {
    const courses = await prisma_1.prisma.course.findMany({
        where: { status: "published" },
        include: { category: true }
    });
    return courses;
};
exports.getCourses = getCourses;
const SaveContactMessage = async (data) => {
    const contact = await prisma_1.prisma.contact.create({
        data: {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        }
    });
    return contact;
};
exports.SaveContactMessage = SaveContactMessage;
