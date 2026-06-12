"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyPayment = exports.getActiveEnrollment = void 0;
const payment_service_1 = require("./payment.service");
const getActiveEnrollment = async (req, res) => {
    const { userId, courseId } = req.params;
    try {
        const enrollment = await (0, payment_service_1.getUserEnrolledCourse)(userId, courseId);
        if (!enrollment) {
            return res.status(200).json({ message: "Enrollment not found", success: false });
        }
        res.status(200).json({ data: enrollment, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
};
exports.getActiveEnrollment = getActiveEnrollment;
const VerifyPayment = async (req, res) => {
    const { transaction_id, courseId, userId } = req.body;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    try {
        const enrollment = await (0, payment_service_1.verifyAndCreateEnrollment)(transaction_id, courseId, userId);
        res.status(200).json({
            success: true,
            message: "Payment verified and enrollment created",
            data: enrollment,
        });
    }
    catch (error) {
        console.error("Verification Error:", error.message);
        res.status(400).json({
            success: false,
            message: error.message || "Could not verify payment",
        });
    }
};
exports.VerifyPayment = VerifyPayment;
