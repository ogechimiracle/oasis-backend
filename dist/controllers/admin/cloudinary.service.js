"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({ folder: "uploads" }, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject("Upload failed");
            resolve(result.secure_url);
        });
        stream.end(fileBuffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
