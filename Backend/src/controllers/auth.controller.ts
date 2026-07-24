import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
import { loginSchema } from "../validators/auth.validator";

export const login = async (req: Request, res: Response) => {
  try {

    const data = loginSchema.parse(req.body);

    const result = await loginUser(
      data.email,
      data.password
    );

    res.status(200).json(result);

  } catch (error: any) {

    res.status(400).json({
      message: error.message,
    });

  }
};