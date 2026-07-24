import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { productSchema } from "../validators/product.validator";

export const createProduct = async (
    req: Request,
    res: Response
) => {

    try {

        // Validate request body
        const data = productSchema.parse(req.body);

        // Call service
        const product = await productService.createProduct(data);

        // Send success response
        res.status(201).json(product);

    } catch (error: any) {

        // Duplicate SKU
        if (error.message === "SKU already exists") {

            return res.status(409).json({
                message: error.message,
            });

        }

        // Validation or other errors
        res.status(400).json({
            message: error.message,
        });

    }

};

export const getProducts = async (
    req: Request,
    res: Response
) => {

    try {

        const products =
            await productService.getAllProducts();

        res.status(200).json(products);

    } catch {

        res.status(500).json({
            message: "Failed to fetch products",
        });

    }

};

export const getProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const product =
            await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);

    } catch {

        res.status(500).json({
            message: "Failed to fetch product",
        });

    }

};

export const updateProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const data = productSchema.parse(req.body);

        const product =
            await productService.updateProduct(id, data);

        res.json(product);

    } catch (error: any) {

        if (error.message === "Product not found") {

            return res.status(404).json({
                message: error.message
            });

        }

        res.status(400).json({
            message: error.message
        });

    }

};

export const deleteProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const result =
            await productService.deleteProduct(id);

        res.status(200).json(result);

    } catch (error: any) {

        if (error.message === "Product not found") {

            return res.status(404).json({
                message: error.message,
            });

        }

        res.status(500).json({
            message: "Failed to delete product",
        });

    }

};