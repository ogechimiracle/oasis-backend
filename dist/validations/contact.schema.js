"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.contactValidation = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    email: zod_1.default.string().email("Invalid email address"),
    subject: zod_1.default.string().min(1, "Subject is required"),
    message: zod_1.default.string().min(1, "Message is required"),
});
