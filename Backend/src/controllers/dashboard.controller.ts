import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const customers = await prisma.customer.count();

    const products = await prisma.product.count();

    const challans = await prisma.challan.count();

    const allProducts = await prisma.product.findMany();

    const lowStock = allProducts.filter(
      (p) => p.currentStock <= p.minimumStock
    ).length;

    res.json({
      customers,
      products,
      challans,
      lowStock,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Dashboard Error",
    });
  }
};