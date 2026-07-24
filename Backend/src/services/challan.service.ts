import prisma from "../config/prisma";
import {
  ChallanStatus,
  MovementType,
} from "@prisma/client";

export const createChallan = async (
  data: any,
  userId: number
) => {

  return await prisma.$transaction(async (tx) => {

    // Check customer
    const customer = await tx.customer.findUnique({
      where: {
        id: data.customerId,
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    let totalQuantity = 0;
    let totalAmount = 0;

    // Create challan first
    const challan = await tx.challan.create({
      data: {
        challanNumber: `CH-${Date.now()}`,
        totalQuantity: 0,
        totalAmount: 0,
        status: ChallanStatus.DRAFT,
        customerId: data.customerId,
        createdBy: userId,
      },
    });

    // Process every item
    for (const item of data.items) {

      const product = await tx.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        throw new Error(
          `Product ${item.productId} not found`
        );
      }

      if (product.currentStock < item.quantity) {
        throw new Error(
          `${product.productName} has insufficient stock`
        );
      }

      // Create challan item
      await tx.challanItem.create({
        data: {
          challanId: challan.id,
          productId: product.id,
          quantity: item.quantity,
          price: item.price,
          productSnapshot: JSON.stringify({
            productName: product.productName,
            sku: product.sku,
            category: product.category,
          }),
        },
      });

      // Reduce stock
      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          currentStock:
            product.currentStock - item.quantity,
        },
      });

      // Stock movement
      await tx.stockMovement.create({
        data: {
          productId: product.id,
          quantity: item.quantity,
          type: MovementType.OUT,
          reason: `Sales Challan ${challan.challanNumber}`,
          userId,
        },
      });

      totalQuantity += item.quantity;
      totalAmount += item.quantity * item.price;
    }

    // Update totals
    const updatedChallan =
      await tx.challan.update({
        where: {
          id: challan.id,
        },
        data: {
          totalQuantity,
          totalAmount,
        },
        include: {
          customer: true,
          items: true,
        },
      });

    return updatedChallan;

  });

};

export const getAllChallans = async () => {

    return await prisma.challan.findMany({

        include: {
            customer: true,
            items: true,
            user: true
        },

        orderBy: {
            createdAt: "desc"
        }

    });

};

export const getChallanById = async (id: number) => {

    const challan = await prisma.challan.findUnique({

        where: {
            id
        },

        include: {
            customer: true,
            items: true,
            user: true
        }

    });

    if (!challan) {
        throw new Error("Challan not found");
    }

    return challan;

};

export const deleteChallan = async (
    id: number
) => {

    await prisma.challan.delete({

        where: {
            id
        }

    });

};