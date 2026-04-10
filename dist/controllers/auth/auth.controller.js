import { registerUser, loginUser } from "./auth.service";
export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "User registered", user: user.email, success: true });
    }
    catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
};
export const login = async (req, res) => {
    try {
        const { token, user } = await loginUser(req.body);
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
