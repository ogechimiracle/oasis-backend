"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessage = exports.getActiveCourse = exports.CourseById = void 0;
const user_service_1 = require("./user.service");
const CourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, user_service_1.getCourseById)(id);
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
exports.CourseById = CourseById;
const getActiveCourse = async (req, res) => {
    try {
        const courses = await (0, user_service_1.getCourses)();
        res.status(200).json({
            data: courses, success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.getActiveCourse = getActiveCourse;
const ContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const result = await (0, user_service_1.SaveContactMessage)({ name, email, subject, message });
        res.status(200).json({
            message: "Message Successfully Sent",
            success: true,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message, success: false
        });
    }
};
exports.ContactMessage = ContactMessage;
