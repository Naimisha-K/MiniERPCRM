import prisma from "../config/prisma";

export const createProduct = async (data: any) => {

    // Check if SKU already exists
    const existingProduct = await prisma.product.findUnique({
        where: {
            sku: data.sku,
        },
    });

    if (existingProduct) {
        throw new Error("SKU already exists");
    }

    // Save product
    return await prisma.product.create({
        data,
    });
};

export const getAllProducts = async () => {

    return await prisma.product.findMany({
        orderBy: {
            id: "desc",
        },
    });

};

export const getProductById = async (id: number) => {

    return await prisma.product.findUnique({
        where: {
            id,
        },
    });

};

export const updateProduct = async (
    id: number,
    data: any
) => {

    const existingProduct = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    if (!existingProduct) {
        throw new Error("Product not found");
    }

    return await prisma.product.update({
        where: {
            id,
        },
        data,
    });

};

export const deleteProduct = async (id: number) => {

    const existingProduct = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    if (!existingProduct) {
        throw new Error("Product not found");
    }

    await prisma.product.delete({
        where: {
            id,
        },
    });

    return {
        message: "Product deleted successfully",
    };

};