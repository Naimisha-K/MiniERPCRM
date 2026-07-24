import { Request, Response } from "express";
import * as inventoryService from "../services/inventory.service";
import { inventorySchema } from "../validators/inventory.validator";
import { AuthRequest } from "../middleware/auth.middleware";
export const stockIn = async (
    req: Request,
    res: Response
) => {

    try {

        // Validate request
        const body = inventorySchema.parse(req.body);

        const authReq = req as AuthRequest;

        const data = {
            ...body,
        userId: authReq.user!.id,
        };

        const product = await inventoryService.stockIn(data);

        // Success response
        res.status(200).json(product);

    } catch (error: any) {

        if (error.message === "Product not found") {

            return res.status(404).json({
                message: error.message,
            });

        }

        res.status(400).json({
            message: error.message,
        });

    }

};

export const stockOut = async (
    req: Request,
    res: Response
) => {

    try {

        const body = inventorySchema.parse(req.body);

        const authReq = req as AuthRequest;

        const data = {
            ...body,
            userId: authReq.user!.id,
        };

        const product = await inventoryService.stockOut(data);

        res.status(200).json(product);

    } catch (error: any) {

        if (error.message === "Product not found") {

            return res.status(404).json({
                message: error.message,
            });

        }

        if (error.message === "Insufficient stock") {

            return res.status(400).json({
                message: error.message,
            });

        }

        res.status(400).json({
            message: error.message,
        });

    }

};

export const getInventory = async (
    req: Request,
    res: Response
) => {

    try {

        const products =
            await inventoryService.getInventory();

        res.json(products);

    } catch {

        res.status(500).json({
            message: "Failed to fetch inventory",
        });

    }

};

export const getHistory = async (
    req: Request,
    res: Response
) => {

    try {

        const history =
            await inventoryService.getHistory();

        res.json(history);

    } catch {

        res.status(500).json({
            message: "Failed to fetch stock history",
        });

    }

};