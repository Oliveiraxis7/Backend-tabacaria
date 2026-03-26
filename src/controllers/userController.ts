import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, cpf } = req.body;

  // 🔴 valida campos obrigatórios
  if (!name || !email || !password || !cpf) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // 🔴 validar email (regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  // 🔴 validar senha
  if (password.length < 6) {
    return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
  }

  // 🔴 validar CPF (simples)
  if (cpf.length !== 11) {
    return res.status(400).json({ error: "CPF inválido" });
  }

  try {
    // 🔴 verificar se email já existe
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // 🔐 criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
      },
    });

    // 🚀 retorno (sem senha)
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      createdAt: user.createdAt,
    });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
};