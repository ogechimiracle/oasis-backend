import { Router } from "express";
import { register, login } from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "../../validations/auth.schema";
const authRouter = Router();
authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/register', validate(registerSchema), register);
export default authRouter;
