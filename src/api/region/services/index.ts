import { Types } from "mongoose";
import region from "../../../models/region";
import { Region } from "../../../types/region";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    create(payload: Region) {
        return new region(payload);
    },
    async save(payload: Region) {
        return await region.create(payload)
    },
    async findOne(payload: Region) {
        return await region.findOne(payload)
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Region) {
        return await region.findOneAndUpdate({ _id }, payload, { new: true })
    },
    async find(payload?: Region|any) {
        return await region.find(payload)
    },
    async validateRegion(id: string) {
        const isRegion = await region.findById(id);
        if (!isRegion) {
            throw new ApplicationError(`region with ${id} not found`)
        }
        return isRegion
    }
}