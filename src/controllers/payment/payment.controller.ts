import { Request, Response } from "express";
import { getPaymentCourse, getUserEnrolledCourse, verifyAndCreateEnrollment } from "./payment.service";
import axios from "axios";


export const getActiveEnrollment = async (req: Request, res: Response) => {
    const { userId, courseId } = req.params;

    try {
        const enrollment = await getUserEnrolledCourse(userId as string, courseId as string);
        if (!enrollment) {
            return res.status(200).json({ message: "Enrollment not found", success: false });
        }
        res.status(200).json({ data: enrollment, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
}


export const VerifyPayment = async (req: Request, res: Response) => {
    const { transaction_id, courseId, userId } = req.body;
    
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    try {
        const enrollment = await verifyAndCreateEnrollment(transaction_id, courseId, userId);

        res.status(200).json({
            success: true,
            message: "Payment verified and enrollment created",
            data: enrollment,
        });
    } catch (error: any) {
        console.error("Verification Error:", error.message);
        res.status(400).json({
            success: false,
            message: error.message || "Could not verify payment",
        });
    }
}