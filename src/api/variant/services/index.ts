import { Types } from "mongoose";
import variant from "../../../models/variant";
import { Variant } from "../../../types/product/variant";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    create(payload: Variant) {
        return new variant(payload);
    },
    async save(payload: Variant) {
        return await variant.create(payload)
    },
    async findOne(payload: Variant) {
        return await variant.findOne(payload).populate('item')
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Variant) {
        return await variant.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload: Variant) {
        return await variant.find(payload).populate('item')
    },
    async validateVariant(id:string){
        const isVariant = await variant.findById(id);
        if(!isVariant){
            throw new ApplicationError(`variant with id ${id} not found`)
        }
        return isVariant
    },
}