import { Types } from "mongoose";
import item from "../../../models/item";
import { Item } from "../../../types/product/item";

export default {
    create(payload: Item) {
        return new item(payload);
    },
    async save(payload: Item) {
        return await item.create(payload)
    },
    async findOne(payload: Item) {
        return await item.findOne(payload)
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Item) {
        return await item.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload: Item) {
        return await item.find(payload).populate("variants")
    }
}