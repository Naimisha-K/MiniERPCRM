import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as challanService from "../services/challan.service";
import { challanSchema } from "../validators/challan.validator";

export const createChallan = async (
    req: Request,
    res: Response
) => {

    try {

        const body = challanSchema.parse(req.body);

        const authReq = req as AuthRequest;

        const challan =
            await challanService.createChallan(
                body,
                authReq.user!.id
            );

        res.status(201).json(challan);

    } catch (error: any) {

        if (
            error.message === "Customer not found"
        ) {

            return res.status(404).json({
                message: error.message,
            });

        }

        if (
            error.message.includes("Product")
        ) {

            return res.status(404).json({
                message: error.message,
            });

        }

        if (
            error.message.includes("insufficient stock")
        ) {

            return res.status(400).json({
                message: error.message,
            });

        }

        res.status(400).json({
            message: error.message,
        });

    }

};

export const getAllChallans = async (
    req: Request,
    res: Response
) => {

    try {

        const challans =
            await challanService.getAllChallans();

        res.status(200).json(challans);

    } catch (error: any) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const getChallanById = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const challan =
            await challanService.getChallanById(id);

        res.status(200).json(challan);

    } catch (error: any) {

        if (error.message === "Challan not found") {

            return res.status(404).json({
                message: error.message
            });

        }

        res.status(500).json({
            message: error.message
        });

    }

};

export const deleteChallan = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        await challanService.deleteChallan(id);

        res.json({
            message: "Challan deleted"
        });

    } catch (error: any) {

        res.status(500).json({
            message: error.message
        });

    }

};