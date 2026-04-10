
import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { success } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered", user: user.email, success:true });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success:false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.json({ token, user:{
      id: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.role.name),
      success:true
    } });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success:false });
  }
};