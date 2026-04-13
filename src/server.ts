import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();

// 🔧 middlewares
app.use(cors());
app.use(express.json());

// 🛣️ rotas
app.use(userRoutes);
app.use(authRoutes);
app.use(productRoutes);

// 🚀 servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});