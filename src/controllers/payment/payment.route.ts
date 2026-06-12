import { Router } from "express";

import { getActiveEnrollment, VerifyPayment } from "./payment.controller";

const PayRoute = Router();

PayRoute.get("/check-enrollment/:userId/:courseId", getActiveEnrollment);
PayRoute.post("/verify", VerifyPayment);




export default PayRoute;