import { NextFunction, Request, Response } from "express";
import services from "../services";
import cartServices from '../../cart/services';
import ApplicationError from "../../../utils/ApplicationError";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await cartServices.validateCart(id);
        let order: any = await services.getByCartId(id)
        if (!order && order._id) {
            throw new ApplicationError(`order with cart ${id} not found`)
        }
        res.send(order)
    } catch (e) {
        next(e)
    }
}