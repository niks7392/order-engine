import { Request, Response } from "express";
import { Cart } from "../../../types/cart";
import services from "../services";

export default async (req: Request, res: Response) => {
    try {
        let cart: Cart;
        const {
            region_id: region,
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
        }
        if (customer) {
            // todo implimentation of user authentictation
        }
        if (country_code) {
            // todo implimentation of user authentictation
        }
        cart = {
            country_code, context
        }
        return res.send(await services.save(cart))
    } catch (e: any) {
        console.log(e);
        if (e.name !== "ApplicationError") {
            return res.sendStatus(500)
        }
        return res.send(e?.message || 'internal server error')
    }
}