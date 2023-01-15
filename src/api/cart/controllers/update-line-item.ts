import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, line_id } = req.params;
        const { quantity } = req.body;
        if (!quantity) throw new ApplicationError(`quantity in body is required to update item`)
        if (!id || !line_id) {
            throw new ApplicationError(`id and line_id both are required parameter to update line item`)
        }

        // VALIDATES BOTH CART AND VARIANT IN THE CART
        await services.validateCart(id);
        await services.validateLineId(id, line_id);

        // UPDATES THE VARIANT IN CART 
        await services.updateVariantInCart(id, line_id, Number(quantity));


        // TODO ENSURE CART PRICES WITH UPDATION
        await services.ensureCartTotal(id)
        res.send(await services.findOne({ _id: id }, true))
    } catch (e) {
        next(e)
    }
}