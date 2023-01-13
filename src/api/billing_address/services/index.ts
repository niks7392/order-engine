import { Types } from "mongoose";
import billing_address from "../../../models/billing_address";
import { Billing_Address } from "../../../types/billing_address";

export default {
    create(payload: Billing_Address) {
        return new billing_address(payload);
    },
    async save(payload: Billing_Address) {
        return await billing_address.create(payload)
    },
    async findOne(payload: Billing_Address) {
        return await billing_address.findOne(payload).populate('customer')
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Billing_Address) {
        return await billing_address.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload: Billing_Address) {
        return await billing_address.find(payload).populate('customer')
    }
}