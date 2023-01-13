import { Types } from "mongoose";
import customer from "../../../models/customer";
import { Customer } from "../../../types/customer";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    create(payload: Customer) {
        return new customer(payload);
    },
    async save(payload: Customer) {
        return await customer.create(payload)
    },
    async findOne(payload: Customer) {
        return await customer.findOne(payload).populate(['shipping_addresses', 'billing_address'])
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Customer) {
        return await customer.findOneAndUpdate({ _id }, payload, { new: true, }).populate(['shipping_addresses', 'billing_address'])
    },
    async find(payload: Customer) {
        return await customer.find(payload).populate(['shipping_addresses', 'billing_address'])
    },
    async validateCustomer(id: string) {
        const isCustomer = await customer.findOne({ _id: id }).populate(['shipping_addresses', 'billing_address'])
        if (!isCustomer) { throw new ApplicationError(`customer with ${id} Not Found`) }
        return isCustomer;
    },
}