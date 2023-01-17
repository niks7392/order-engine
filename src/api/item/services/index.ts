import { CallbackError, MongooseError, Types } from "mongoose";
import item from "../../../models/item";
import { Item } from "../../../types/product/item";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    create(payload: Item) {
        return new item(payload);
    },
    async save(payload: Item) {
        return await item.create(payload)
    },
    async findOne(payload: Item, populate?: string | Array<string>) {
        let entity;
        if (populate) {
            entity = await item.findOne(payload).populate(populate)
            if (!entity) throw new ApplicationError(`item with ${Object.keys(payload)}: ${Object.values(payload)} not found`)
            return entity
        }
        entity = await item.findOne(payload)
        if (!entity) throw new ApplicationError(`item with ${Object.keys(payload)}: ${Object.values(payload)} not found`)
        return  entity
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Item) {
        return await item.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload: Item) {
        return await item.find(payload).populate("variants")
    },
    async validateItem(_id: string) {
        let isItem = await item.findById(_id).populate('variants');
        if (!isItem) {
            throw new ApplicationError(`item with ${_id} not found`);
        }
        return isItem
    },

    // TODO:  VARIANT SHOULDNT GET PUSHED LIKE THIS NOT A PROPER WAY USE MODEL.UPDATEONE
    async pushVariant(_id: Types.ObjectId | string, variant: string | Types.ObjectId) {
        return await item.findOne({ _id }, async (err: CallbackError, document: any) => {
            if (err) {
                throw new ApplicationError(err.message);
            }
            document.variants.push(variant);
            await document.save()
        }).clone().populate("variants").catch((e: MongooseError) => { throw new ApplicationError(e.message) })
    }
}