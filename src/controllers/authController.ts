import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({ token });

  } catch (error) {
    return res.status(500).json({ error: "Erro no login" });
  }
};