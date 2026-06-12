import {prisma} from '../../lib/prisma';
import axios from 'axios';

export const getPaymentCourse = async (id:string)=>{
    const course = await prisma.course.findUnique({
        where:{id},
    })

    return course;
}


export const getUserEnrolledCourse = async (userId:string, courseId:string)=>{
    const isEnrolled = await prisma.enrollment.findUnique({
        where:{
            userId_courseId:{
                userId,
                courseId
            }
        }
    });

    return isEnrolled;
};

export const verifyAndCreateEnrollment = async (transaction_id: string, courseId: string, userId: string)=>{
    //  Call Flutterwave to verify the transaction
    const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
        }
    );

    const flwData = response.data.data;

    //  Security: Verify amount and currency from your DB Course model
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) throw new Error("Course not found");
    if (flwData.status !== "successful" || flwData.amount < (course.cost || 0)) {
        throw new Error("Invalid payment details or insufficient amount");
    }

    // Database Transaction: Atomic Payment + Enrollment
    // We use $transaction to ensure both happen or neither happens
    return await prisma.$transaction(async (tx) => {

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