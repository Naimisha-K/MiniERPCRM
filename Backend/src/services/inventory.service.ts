import prisma from "../config/prisma";
import { MovementType } from "@prisma/client";

export const stockIn = async (data: any) => {

    const product = await prisma.product.findUnique({
        where: {
            id: data.productId,
        },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    return await prisma.$transaction(async (tx) => {

        // Update product stock
        const updatedProduct = await tx.product.update({
            where: {
                id: data.productId,
            },
            data: {
                currentStock: product.currentStock + data.quantity,
            },
        });

        // Create stock movement log
        await tx.stockMovement.create({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                type: MovementType.IN,
                reason: data.reason,
                userId: data.userId,
            },
        });

        return updatedProduct;

    });

};

export const stockOut = async (data: any) => {

    const product = await prisma.product.findUnique({
        where: {
            id: data.productId,
        },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    if (product.currentStock < data.quantity) {
        throw new Error("Insufficient stock");
    }

    return await prisma.$transaction(async (tx) => {

        const updatedProduct = await tx.product.update({
            where: {
                id: data.productId,
            },
            data: {
                currentStock: product.currentStock - data.quantity,
            },
        });

        await tx.stockMovement.create({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                type: MovementType.OUT,
                reason: data.reason,
                userId: data.userId,
            },
        });

        return updatedProduct;
    });

};

export const getInventory = async () => {

    return await prisma.product.findMany({
        orderBy: {
            productName: "asc",
        },
    });

};

export const getHistory = async () => {

    return await prisma.stockMovement.findMany({

        include: {
            product: true,
            user: true,
        },

        orderBy: {
            createdAt: "desc",
        },

    });

};