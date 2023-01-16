import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";
import customerServices from "../../customer/services";
import regionServices from "../../region/services";
import shippingAddressServices from "../../shipping_address/services";
import billingAddressServices from "../../billing_address/services";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApplicationError(`id is required to update the cart`);
        }
        const isExists = await services.findOne({ _id: id });
        if (!isExists) {
            throw new ApplicationError(`cart with id ${id} Not Found`);
        };
        const context = {
            ip: req.ip,
            user_agent: req.get('User-Agent')
        }
        //TODO  COUTNRY_CODE VALIDATION IS PENDING DiSCOUNTS NOT IMPILMENTED YET
        const { region, country_code, billing_address, shipping_address, discounts, customer } = req.body;
        let updatedShippingAddress: any;
        let updatedbillingAddress: any;
        // VALIDATING IF CUSTOMER AND REGIONIS IS VALID AND EXISTS 
        if (customer) {
            await customerServices.validateCustomer(customer);
        }
        if (region) {
            await regionServices.validateRegion(region);
        }

        // VALIIDATING IF CART ALREADY HAS SHIPPING ADDRESS
        if (isExists.shipping_address) {
            updatedShippingAddress = await shippingAddressServices.updateWithId(isExists.shipping_address._id, shipping_address)
        } else {
            updatedShippingAddress = await shippingAddressServices.save(shipping_address);
        }

        // VALIIDATING IF CART ALREADY HAS BILLING ADDRESS
        if (isExists.billing_address) {
            updatedbillingAddress = await billingAddressServices.updateWithId(isExists.billing_address._id, billing_address);
        } else {
            updatedbillingAddress = await billingAddressServices.save(billing_address);
        }


        // VLIDATION CHECK FOR SHIPPING_ADDRESS
        await services.ensureCartTotal(id);
        return res.send(await services.updateWithId(id, {
            region, customer, shipping_address: updatedShippingAddress._id, billing_address: updatedbillingAddress._id, context, country_code
        }))
    } catch (e) {
        next(e)
    }
}