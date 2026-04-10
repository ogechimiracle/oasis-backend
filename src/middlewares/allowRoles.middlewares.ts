export const allowRoles =
  (...allowedRoles: string[]) =>
  (req: any, res: any, next: any) => {

    const userRoles = req.user.roles;

    const allowed = userRoles.some((role:any) =>
      allowedRoles.includes(role)
    );

    if (!allowed) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };