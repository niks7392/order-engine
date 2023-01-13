import { Types } from "mongoose";
import shipping_address from "../../../models/shipping_address";
import { Shipping_Address } from "../../../types/shipping_address";

export default {
    create(payload: Shipping_Address) {
        return new shipping_address(payload);
    },
    async save(payload: Shipping_Address) {
        return await shipping_address.create(payload)
    },
    async findOne(payload: Shipping_Address) {
        return await shipping_address.findOne(payload)
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Shipping_Address) {
        return await shipping_address.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload: Shipping_Address) {
        return await shipping_address.find(payload).populate('customer')
    }
}