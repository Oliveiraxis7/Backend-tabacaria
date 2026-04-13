import { Request, Response } from "express";
import { prisma } from "../services/prisma";

// 🛒 criar produto
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// 📋 listar produtos
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// ❌ deletar produto
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: id as string },
    });

    return res.json({ message: "Produto deletado" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar produto" });
  }
};