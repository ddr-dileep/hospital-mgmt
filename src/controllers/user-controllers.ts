import { Request, Response } from "express";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    res.status(200).json({ name: name, email: email, password: password });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
