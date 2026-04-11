"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = void 0;
const allowRoles = (...allowedRoles) => (req, res, next) => {
    const userRoles = req.user.roles;
    const allowed = userRoles.some((role) => allowedRoles.includes(role));
    if (!allowed) {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    next();
};
exports.allowRoles = allowRoles;
