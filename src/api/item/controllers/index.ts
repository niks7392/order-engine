import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // console.log(req.body);
            const {
                title,
                subtitle,
                description,
                handle,
                status,
                images,
                thumbnail,
                variants,
                origin_country,
                material,
                type,
                tags,
                discountable,
                metadata,
            } = req.body;

            const create = services.create({
                title,
                subtitle,
                description,
                handle,
                status,
                images,
                thumbnail,
                variants,
                origin_country,
                material,
                type,
                tags,
                discountable, metadata
            });
            const created = await services.save({
                title,
                subtitle,
                description,
                handle,
                status,
                images,
                thumbnail,
                variants,
                origin_country,
                material,
                type,
                tags,
                discountable, metadata
            });
            res.send(created)
        } catch (e) {
            next(e)
        }
    },
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title,
                subtitle,
                description,
                handle,
                status,
                images,
                thumbnail,
                variants,
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
                variants,
                origin_country,
                material,
                type,
                tags,
                discountable, metadata
            });
            res.send(updated)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }
    },
    async find(req: Request, res: Response, next: NextFunction) {
        try {
            const { query } = req;
            return res.send(await services.find(query))
        } catch (e) {
            next(e)
        }
    },
    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            return res.send(await services.findOne({ _id: id }, "variants"))
        } catch (e) {
            next(e)
        }
    },
    delete(req: Request, res: Response) {
        res.send(req.path)
    }
}