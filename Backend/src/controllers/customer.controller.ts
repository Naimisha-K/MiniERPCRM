import { Request, Response } from "express";
import * as customerService from "../services/customer.service";
import { customerSchema } from "../validators/customer.validator";

export const createCustomer = async (
    req: Request,
    res: Response
) => {
    try {
        const data = customerSchema.parse(req.body);
        const customer = await customerService.createCustomer(data);
        res.status(201).json(customer);
    } catch (error) {
    console.error("Create Customer Error:", error);

    res.status(500).json({
        message: "Failed to create customer",
        error,
    });
}
};

export const getCustomers = async (
    req: Request,
    res: Response
) => {
    try {
        const customers = await customerService.getAllCustomers();

        res.json(customers);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching customers",
        });
    }
};

export const getCustomerById = async (
    req: Request,
    res: Response
) => {
    try {

        const id = Number(req.params.id);

        const customer = await customerService.getCustomerById(id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json(customer);

    } catch (error) {

        res.status(500).json({
            message: "Something went wrong"
        });

    }
};

export const updateCustomer = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const data = customerSchema.parse(req.body);

        const customer = await customerService.updateCustomer(
            id,
            data
        );

        res.status(200).json(customer);

    } catch (error) {

        res.status(500).json({
            message: "Update failed"
        });

    }

};

export const deleteCustomer = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        await customerService.deleteCustomer(id);

        res.status(200).json({
            message: "Customer deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Delete failed"
        });

    }

};