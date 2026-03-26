import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};