"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.courseValidation = zod_1.default.object({
    category: zod_1.default.string().min(1, "Category is required"),
    title: zod_1.default.string().min(3, "Title must be at least 3 characters"),
    slug: zod_1.default.string().optional(),
    briefDefinition: zod_1.default.string().min(10, "Brief definition too short"),
    prerequisite: zod_1.default.string().optional(),
    keyAreas: zod_1.default.array(zod_1.default.string()).min(1, "this field is required"),
    outcomes: zod_1.default.array(zod_1.default.string()).min(1, "this field is required"),
    jobRoles: zod_1.default.array(zod_1.default.string()).min(1, "this field is required"),
    industries: zod_1.default.array(zod_1.default.string()).min(1, "this field is required"),
    duration: zod_1.default.string().optional(),
    cost: zod_1.default
        .number()
        .optional()
        .transform((val) => (val ? Number(val) : null)),
    paid: zod_1.default.boolean(),
    thumbnail: zod_1.default.any().optional(),
    level: zod_1.default.enum(["beginner", "intermediate", "advanced"]),
});
