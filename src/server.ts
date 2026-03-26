import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
  return res.json({ message: "API rodando 🚀" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
import { authMiddleware } from "./middlewares/authMiddleware";

app.get("/perfil", authMiddleware, (req, res) => {
  return res.json({ message: "Você está autenticado 🔐" });
});