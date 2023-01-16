import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, line_id } = req.params;
        if (!id || !line_id) {
            throw new ApplicationError(`id and line_id both are required parameter to update line item`)
        }

        // VALIDATES BOTH CART AND VARIANT IN THE CART
        await services.validateCart(id);
        await services.validateLineId(id, line_id);
        await services.deleteVariantInCart(id, line_id);
        await services.ensureCartTotal(id)
        res.send(await services.findOne({ _id: id }, true))
    } catch (e) {
        console.log(e);
        
        next(e)
    }
}