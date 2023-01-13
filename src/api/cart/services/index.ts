import { Document, MongooseError, Types } from "mongoose";
import cart from "../../../models/cart";
import { Cart } from "../../../types/cart";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    async findOne(payload: Cart) {
        return await cart.findOne(payload).populate(['customer', 'shipping_address', 'billing_address', 'region', 'items'])
    },
    create(payload?: Cart) {
        return new cart(payload)
    },
    async save(payload?: Cart) {
        return await cart.create(payload)
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Cart) {
        return await cart.findByIdAndUpdate(_id, payload, { new: true }).populate(['customer', 'shipping_address', 'billing_address', 'region', 'items'])
    },
    async find(payload: Cart) {
        return await cart.find(payload).populate(['customer', 'shipping_address', 'billing_address', 'region'])
    },
    async validateCart(id: string | Types.ObjectId) {
        const isCart = await cart.findOne({ _id: id }).populate(['customer', 'shipping_address', 'billing_address', 'region'])
        if (!isCart) {
            throw new ApplicationError(`cart with ${id} Not Found`)
        }
        return isCart
    },
    async variantExists(id: string, variant_id: string) {
        return await cart.findOne({ _id: id, items: { $eq: variant_id } })
        return await cart.findById(id).select('items').populate("items")
    },
    async pushVariant(cart_id: string, variant_id: string) {
        return await cart.findOne({ _id:cart_id, items: variant_id, }, async (err: MongooseError, doc: Document | any) => {
            if (err) {
                throw new ApplicationError(err.message);
            }
            doc.items.push(variant_id)
            doc.save()
        }).clone().populate(['customer', 'shipping_address', 'billing_address', 'region', 'items'])
    }
}