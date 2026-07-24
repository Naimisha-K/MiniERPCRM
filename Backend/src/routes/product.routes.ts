import { Router } from "express";
import * as productController from "../controllers/product.controller";

const router = Router();

// Create Product
router.post("/", productController.createProduct);

// Get Products
router.get("/", productController.getProducts);

// Get Product by ID
router.get("/:id", productController.getProduct);

// Update Product
router.put("/:id", productController.updateProduct);

// Delete Product
router.delete("/:id", productController.deleteProduct);

export default router;