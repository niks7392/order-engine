import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title,
            subtitle,
            description,
            handle,
            status,
            images,
            thumbnail,
            // variants,
            origin_country,
            material,
            type,
            tags,
            discountable,
            metadata } = req.body;
        const exists = await services.findOne({ _id: id });
        if (!exists?._id) {
            throw new ApplicationError(`billing_address with ${id} not found`);
        }
        const updated = await services.updateWithId(exists._id, {
            title,
            subtitle,
            description,
            handle,
            status,
            images,
            thumbnail,
            // variants,
            origin_country,
            material,
            type,
            tags,
            discountable, metadata
        });
        res.send(updated)
    } catch (e) {
        next(e)
    }
}