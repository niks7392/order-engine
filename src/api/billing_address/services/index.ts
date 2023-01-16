import { Types } from "mongoose";
import billing_address from "../../../models/billing_address";
import { Billing_Address } from "../../../types/billing_address";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    create(payload: Billing_Address) {
        return new billing_address(payload);
    },
    async save(payload: Billing_Address) {
        return await billing_address.create(payload)
    },
    async findOne(payload: Billing_Address, populate?: string | Array<string>) {
        let entity;
        if (populate) {
            entity = await billing_address.findOne(payload).populate(populate)
            if (!entity) throw new ApplicationError(`address with ${Object.keys(payload)}: ${Object.values(payload)} Not Found`);
            return entity
        }
        entity = await billing_address.findOne(payload);
        if (!entity) throw new ApplicationError(`address with ${Object.keys(payload)}: ${Object.values(payload)} Not Found`);
        return entity
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Billing_Address) {
        return await billing_address.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload: Billing_Address, populate?: string | Array<string>) {
        let entity;
        if (populate) {
            entity = await billing_address.find(payload).populate(populate)
            if (!entity) throw new ApplicationError(`address with ${Object.keys(payload)}: ${Object.values(payload)} Not Found`);
            return entity
        }
        entity = await billing_address.find(payload);
        if (!entity) throw new ApplicationError(`address with ${Object.keys(payload)}: ${Object.values(payload)} Not Found`);
        return entity
    },
    async delete(_id: string | Types.ObjectId) {
        return await billing_address.findByIdAndDelete(_id)
    }
}