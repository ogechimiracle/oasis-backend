"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const PayRoute = (0, express_1.Router)();
PayRoute.get("/check-enrollment/:userId/:courseId", payment_controller_1.getActiveEnrollment);
PayRoute.post("/verify", payment_controller_1.VerifyPayment);
exports.default = PayRoute;
