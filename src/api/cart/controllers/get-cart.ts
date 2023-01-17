import { NextFunction, Request, Response } from "express";
import { Cart } from "../../../types/cart";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApplicationError('id is require to update the cart')
        }

        const isExists = await services.findOne({ _id: id });
        if (!isExists) {
            res.status(404);
            throw new ApplicationError(`cart with ${id} Not Found`);
        };
        await services.ensureCartTotal(id)
        let relations = services.getRelations()
        let cart = await services.findOne({ _id: id }, relations)
        return res.send(cart)
    } catch (e: any) {
        next(e)
    }
}