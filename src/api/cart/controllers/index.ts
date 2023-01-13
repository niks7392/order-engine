import { Request, Response } from "express";
import cart from "../../../models/cart";
import { Cart } from "../../../types/cart";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default {
    async create(req: Request, res: Response) {
        try {
            // const { email }: Cart = req.body;
            // const create = services.create();
            const created = await services.save();
            return res.json(created)
        } catch (e) {
            return res.send('internal server error')
        }
    },
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                customer,
                billing_address,
                shipping_address,
                items,
                subtotal,
                total,
                email,
                discount_total,
                discounts,
                metadata,
            }: Cart = req.body;
            const exists = await services.findOne({ _id: id });
            if (!exists?._id) {
                throw new ApplicationError(`cart with ${id} not found`)
            }
            const updated = await services.updateWithId(id, {
                customer,
                billing_address,
                shipping_address,
                items,
                subtotal,
                total,
                email,
                discount_total,
                discounts,
                metadata
            });
            return res.send(updated)
        } catch (e: any) {
            console.log(e);
            return res.status(500).send(e && e.message ? e.message : 'internal server error')
        }
    },
    async find(req: Request, res: Response) {
        try {
            let carts = await cart.find();
            res.send(carts)
        } catch (e) {
            return res.status(500).send('internal server error')
        }
    },
    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cart = await services.findOne({ _id: id });
            if(!cart){
                throw new ApplicationError(`cart with ${id} not found`);
            }
            res.send(cart)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }
    },
    delete(req: Request, res: Response) {
        res.send(req.path)
    }
}