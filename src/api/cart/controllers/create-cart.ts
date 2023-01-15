import { NextFunction, Request, Response } from "express";
import { Cart } from "../../../types/cart";
import services from "../services";
import regonServices from '../../region/services';
import customerServices from '../../customer/services';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let cart: Cart;
        let {
            region,
            country_code,
            customer
        } = req.body;

        const context = {
            ip: req.ip,
            user_agent: req.get("User-Agent")
        };
        if (region) {
            // TODO IMPILIMENT REGION CONTENT TYPE 
            // const {_id}:Region = await regionService.get(region) //checks wheter region id is valid or not 
            // if not then add any region to cart 
            await regonServices.validateRegion(region);
        } else {
            //Create region if not provided
            let regions = await regonServices.find();
            console.log(regions);
            region = regions[0]._id

        }
        if (customer) {
            // todo implimentation of user authentictation
            await customerServices.validateCustomer(customer)
        }
        if (country_code) {
            // todo implimentation of user authentictation
        }
        cart = {
            country_code, context, region, customer
        }
        return res.send(await services.save(cart))
    } catch (e: any) {
        next(e)
    }
}