import { Router } from "express";
import { createProduct, getProducts, deleteProduct } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/products", authMiddleware, createProduct);
router.get("/products", getProducts);
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;