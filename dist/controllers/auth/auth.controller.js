"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const register = async (req, res) => {
    try {
        const user = await (0, auth_service_1.registerUser)(req.body);
        res.status(201).json({ message: "User registered", user: user.email, success: true });
    }
    catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { token, user } = await (0, auth_service_1.loginUser)(req.body);
        res.json({ token, user: {
                id: user.id,
                email: user.email,
                roles: user.roles.map((r) => r.role.name),
                success: true
            } });
    }
    catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
};
exports.login = login;
