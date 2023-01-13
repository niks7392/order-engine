import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default {
    async create(req: Request, res: Response, next:NextFunction) {
        try {
            const {
                name,
                currency_code,
                countries,
                includes_taxes,
                metadata
            } = req.body;
            // const create = services.create({ name, currency_code, countries, includes_taxes, metadata });
            const created = await services.save({ name, currency_code, countries, includes_taxes, metadata });
            res.send(created)
        } catch (e) {
            next(e)
        }
    },
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name,
                currency_code,
                countries,
                includes_taxes,
                metadata } = req.body;
            const exists = await services.findOne({ _id: id });
            if (!exists?._id) {
                throw new ApplicationError(`billing_address with ${id} not found`);
            }
            const updated = await services.updateWithId(exists._id, {
                metadata, currency_code,
                countries,
                includes_taxes,
            });
            res.send(updated)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }
    },
    async find(req: Request, res: Response, next : NextFunction) {
        try {
            const { query } = req;
            return res.send(await services.find(query))
        } catch (e) {
            next(e)
        }
    },
    findOne(req: Request, res: Response) {
        res.send(req.path)
    },
    delete(req: Request, res: Response) {
        res.send(req.path)
    }
}