import { getCourseById, getCourses, SaveContactMessage } from "./user.service";
export const CourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getCourseById(id);
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
export const getActiveCourse = async (req, res) => {
    try {
        const courses = await getCourses();
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
export const ContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const result = await SaveContactMessage({ name, email, subject, message });
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
