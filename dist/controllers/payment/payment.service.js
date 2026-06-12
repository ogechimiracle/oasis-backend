"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAndCreateEnrollment = exports.getUserEnrolledCourse = exports.getPaymentCourse = void 0;
const prisma_1 = require("../../lib/prisma");
const axios_1 = __importDefault(require("axios"));
const getPaymentCourse = async (id) => {
    const course = await prisma_1.prisma.course.findUnique({
        where: { id },
    });
    return course;
};
exports.getPaymentCourse = getPaymentCourse;
const getUserEnrolledCourse = async (userId, courseId) => {
    const isEnrolled = await prisma_1.prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId
            }
        }
    });
    return isEnrolled;
};
exports.getUserEnrolledCourse = getUserEnrolledCourse;
const verifyAndCreateEnrollment = async (transaction_id, courseId, userId) => {
    //  Call Flutterwave to verify the transaction
    const response = await axios_1.default.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
    });
    const flwData = response.data.data;
    //  Security: Verify amount and currency from your DB Course model
    const course = await prisma_1.prisma.course.findUnique({ where: { id: courseId } });
    if (!course)
        throw new Error("Course not found");
    if (flwData.status !== "successful" || flwData.amount < (course.cost || 0)) {
        throw new Error("Invalid payment details or insufficient amount");
    }
    // Database Transaction: Atomic Payment + Enrollment
    // We use $transaction to ensure both happen or neither happens
    return await prisma_1.prisma.$transaction(async (tx) => {
        // Calculate Duration (e.g., 1 year access)
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        // Create the Payment Record
        const payment = await tx.payment.create({
            data: {
                amount: flwData.amount,
                currency: flwData.currency,
                status: "successful",
                transactionRef: flwData.tx_ref,
                flutterwaveId: String(flwData.id),
                user: {
                    connect: { id: userId }
                }
            },
        });
        // Create or Update the Enrollment Record
        const enrollment = await tx.enrollment.upsert({
            where: {
                userId_courseId: { userId, courseId },
            },
            update: {
                status: "active",
                expiresAt: expiryDate,
            },
            create: {
                userId,
                courseId,
                status: "active",
                enrolledAt: new Date(),
                expiresAt: expiryDate,
                // Link the payment we just created to this enrollment
                payment: { connect: { id: payment.id } }
            },
        });
        return enrollment;
    });
};
exports.verifyAndCreateEnrollment = verifyAndCreateEnrollment;
