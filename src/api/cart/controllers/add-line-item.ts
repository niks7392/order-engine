import { NextFunction, Request, Response } from "express";
import services from "../services";
import variantServices from '../../variant/services'
import ApplicationError from "../../../utils/ApplicationError";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await services.validateCart(id);
        const { variant: variant_id, quantity } = req.body;
        // if(quantity<0)throw new ApplicationError(`cannot set quantity in negative`)
        let variant = await variantServices.validateVariant(variant_id);
        if (!variant.item) {
            throw new ApplicationError('variant has no item linked with it cannot add product right now')
        };

        await services.pushVariantInCart(id, variant_id, Number(quantity));
        //TODO ENSURE THE CART PRICES TOTALS AND DISCOUNTS 
         await services.ensureCartTotal(id);
        res.send(await services.findOne({_id:id}, services.getRelations()))
    } catch (e) {
        next(e)
    }
}