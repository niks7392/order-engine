import { Types } from "mongoose";
import order from "../../../models/order";
import { Order } from "../../../types/order";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    create(payload: Order) {
        return new order(payload);
    },
    async save(payload: Order) {
        return await order.create(payload)
    },
    async findOne(payload: Order, populate?: string | Array<string>) {
        let entity;
        if (populate) {
            entity = await order.findOne(payload).populate(populate);
            if (!entity) throw new ApplicationError(`order with ${Object.keys(payload)}: ${Object.values(payload)} Not Found`);
            return entity
        }
        entity = await order.findOne(payload);
        if (!entity) throw new ApplicationError(`order with ${Object.keys(payload)}: ${Object.values(payload)} Not Found`);
        return entity

    },
    async updateWithId(_id: Types.ObjectId | string, payload: Order) {
        return await order.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload?: Order | any) {
        return await order.find(payload)
    },
    async validateOrder(id: string) {
        const isOrder = await order.findById(id);
        if (!isOrder) {
            throw new ApplicationError(`order with ${id} not found`)
        }
        return isOrder
    },
    async getByCartId(cart_id:string|Types.ObjectId){
        return await order.findOne({cart : cart_id});
    },
    async createFromCart(cart_id : string|Types.ObjectId){
    }
}