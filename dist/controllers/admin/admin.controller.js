"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContacts = exports.getArchivedCourses = exports.UpdateCourse = exports.getPendingCourses = exports.adminCourseById = exports.delCourse = exports.publishCourse = exports.createCourse = exports.getCourses = exports.getCourseCategory = exports.addCoursCategory = exports.assignRoleController = exports.getStat = void 0;
const admin_service_1 = require("./admin.service");
const cloudinary_service_1 = require("./cloudinary.service");
const prisma_1 = require("../../lib/prisma");
const getStat = async (req, res) => {
    try {
        const stats = await (0, admin_service_1.adminGetStatistics)();
        res.status(200).json({
            stats,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.getStat = getStat;
const assignRoleController = async (req, res) => {
    try {
        const { userId, roleName } = req.body;
        const result = await (0, admin_service_1.assignRoleService)(userId, roleName);
        res.status(200).json({
            message: "Role assigned successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.assignRoleController = assignRoleController;
const addCoursCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const result = await (0, admin_service_1.addCategory)(name, slug);
        res.status(200).json({
            message: "Category Successfully Added",
            data: result,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.addCoursCategory = addCoursCategory;
const getCourseCategory = async (req, res) => {
    try {
        const resut = await (0, admin_service_1.getCategory)();
        res.status(200).json({
            data: resut,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.getCourseCategory = getCourseCategory;
const getCourses = async (req, res) => {
    try {
        const courses = await (0, admin_service_1.getCourse)();
        res.status(200).json({
            data: courses,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.getCourses = getCourses;
const createCourse = async (req, res) => {
    try {
        const file = req.file;
        let thumbnailUrl;
        if (file) {
            thumbnailUrl = await (0, cloudinary_service_1.uploadToCloudinary)(file.buffer);
        }
        const data = {
            ...req.body,
            thumbnail: thumbnailUrl || undefined,
        };
        const course = await (0, admin_service_1.addCourse)(data);
        res.status(201).json({
            message: "Course created successfully",
            data: course,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.createCourse = createCourse;
const publishCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await (0, admin_service_1.activateCourse)(id);
        res.status(200).json({
            message: "Course published successfully",
            data: course,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.publishCourse = publishCourse;
const delCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await (0, admin_service_1.deleteCourse)(id);
        res.status(200).json({
            message: "Course deleted successfully",
            data: course,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.delCourse = delCourse;
const adminCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, admin_service_1.adminGetCourseById)(id);
        res.status(200).json({
            data: result, success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.adminCourseById = adminCourseById;
const getPendingCourses = async (req, res) => {
    try {
        const courses = await (0, admin_service_1.adminGetPendingCourses)();
        res.status(200).json({
            data: courses,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.getPendingCourses = getPendingCourses;
const UpdateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        const courseId = Array.isArray(id) ? id[0] : id;
        const parsedData = req.body?.data ? JSON.parse(req.body.data) : {};
        // console.log(courseId)
        // console.log(parsedData)
        const existingCourse = await prisma_1.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        let thumbnail = existingCourse.thumbnail;
        if (file) {
            thumbnail = await (0, cloudinary_service_1.uploadToCloudinary)(file.buffer);
        }
        const data = {
            ...parsedData,
            thumbnail,
        };
        const course = await (0, admin_service_1.updateCourse)(courseId, data);
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.UpdateCourse = UpdateCourse;
const getArchivedCourses = async (req, res) => {
    try {
        const courses = await (0, admin_service_1.adminGetArchivedCourses)();
        res.status(200).json({
            data: courses,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.getArchivedCourses = getArchivedCourses;
const getContacts = async (req, res) => {
    try {
        const contact = await (0, admin_service_1.adminGetContactMessages)();
        res.status(200).json({
            data: contact,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.getContacts = getContacts;
