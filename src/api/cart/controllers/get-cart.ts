import { NextFunction, Request, Response } from "express";
import { Cart } from "../../../types/cart";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApplicationError('id is require to update the cart')
        }

        const isExists = await services.findOne({ _id: id }, true);
        if (!isExists) {
            res.status(404);
            throw new ApplicationError(`cart with ${id} Not Found`);
        };
        let cart = isExists;
        return res.send(cart)
    } catch (e: any) {
        next(e)
    }
}