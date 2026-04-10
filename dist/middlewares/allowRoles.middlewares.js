export const allowRoles = (...allowedRoles) => (req, res, next) => {
    const userRoles = req.user.roles;
    const allowed = userRoles.some((role) => allowedRoles.includes(role));
    if (!allowed) {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    next();
};
