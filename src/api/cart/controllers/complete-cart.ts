import { NextFunction, Request, Response } from "express";
import services from "../services";
import orderServices from '../../order/services'
import ApplicationError from "../../../utils/ApplicationError";
import { Order } from "../../../types/order";
import { Cart } from "../../../types/cart";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        let { items, total, email, customer, shipping_address, billing_address, _id: cart, region, metadata } = await services.validateCart(id, ['items.item', 'region']);
        // VALIDATING IF ORDER ALREADY EXISTS WITH THE CART
        let isOrderExists = await orderServices.getByCartId(id)
        if (isOrderExists) {
            throw new ApplicationError(`an order with this cart already exists`);
        };

        // BASIC CHECKS
        if (!region) throw new ApplicationError(`cannot complete cart without region`); // COMMENT THE LINE FOR TEST
        if (!customer) throw new ApplicationError(`cannot complete cart without customer`) // COMMENT THE LINE FOR TEST
        if (!shipping_address) throw new ApplicationError(`cannot complete cart without shipping_address`)
        if (!billing_address) throw new ApplicationError(`cannot complete cart without billing_address`)
        if (items.length === 0) {
            // THROW ERROR IF CART HAS NO ITEMS IN IT
            throw new ApplicationError(`Cannot create order from empty cart`)
        }

        if (total === 0) { } // TODO: IF DISCOUNT APPLIIED TOTAL CAN BE 0 

        // TODO: PAYMENT SERVICE THAT CHECKS WHETHER APPOVE THIS ORDER OR NOT
        // const {status } = paymentServices.findOne(paymentId)
        // if(status!--'authorized') throw new ApplicationError(`payment method is not authorized`)


        // parsing the items because the items is document of mongoose not a object of js yet 
        items = JSON.parse(JSON.stringify(items))
        const toCreate = {
            email,
            customer,
            shipping_address, billing_address,
            cart,
            currency_code: region.currency_code,
            metadata,
            items,
            total,
            status: 'pending',
            currency: 'inr'
        } as Order;


        // uncomment for real  order
        let order = await orderServices.save(toCreate)

        // uncomment for draft  order
        // let order = await orderServices.create(toCreate)

        // SETTING CART AS COMPLETED 
        await services.updateWithId(cart, {
            completed_at: new Date()
        })
        res.send(order)
    } catch (e) {
        next(e)
    }
}