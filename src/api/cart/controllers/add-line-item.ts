import { NextFunction, Request, Response } from "express";
import services from "../services";
import globalServices from '../../../service'
import variantServices from '../../variant/services'
import ApplicationError from "../../../utils/ApplicationError";
import cart from "../../../models/cart";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // let cart = await services.validateCart(id);
        const { variant: variant_id, quantity } = req.body;
        let variant = await variantServices.validateVariant(variant_id);
        if (!variant.item) {
            throw new ApplicationError('variant has no item linked with it cannot add product right now')
        };

        //TODO IMPLIMENT IF ITEM IS EXISTS THEN UPDATE THE ITEM NOT THE SHIT 
        // const cart: any = await services.variantExists(id, variant_id);
        let i = 0;
        while (i < quantity) {
            if(i===quantity){
                break;
            }
            i++
            await services.pushVariant(id, variant_id)
        }
        res.send(await services.findOne({ _id: id }))
    } catch (e) {
        next(e)
    }
}