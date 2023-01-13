import { NextFunction, Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // console.log(req.body);
            const { title,
                item,
                prices,
                sku,
                inventory_quantity,
                origin_country,
                material,
                metadata,
                original_price,
                calculated_price,
                original_price_incl_tax,
                calculated_price_incl_tax,
                original_tax,
                calculated_tax,
                tax_rates } = req.body;

            // const create = services.create({
            //     title,
            //     product,
            //     prices,
            //     sku,
            //     inventory_quantity,
            //     origin_country,
            //     material,
            //     created_at,
            //     updated_at,
            //     deleted_at,
            //     metadata,
            //     original_price,
            //     calculated_price,
            //     original_price_incl_tax,
            //     calculated_price_incl_tax,
            //     original_tax,
            //     calculated_tax,
            //     tax_rates
            // });
            const created = await services.save({
                title,
                item,
                prices,
                sku,
                inventory_quantity,
                origin_country,
                material,
                metadata,
                original_price,
                calculated_price,
                original_price_incl_tax,
                calculated_price_incl_tax,
                original_tax,
                calculated_tax,
                tax_rates
            });
            res.send(created)
        } catch (e) {
            next(e)
        }
    },
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { title,
                item,
                prices,
                sku,
                inventory_quantity,
                origin_country,
                material,
                metadata,
                original_price,
                calculated_price,
                original_price_incl_tax,
                calculated_price_incl_tax,
                original_tax,
                calculated_tax,
                tax_rates } = req.body;
            const exists = await services.findOne({ _id: id });
            if (!exists?._id) {
                throw new ApplicationError(`billing_address with ${id} not found`);
            }
            const updated = await services.updateWithId(exists._id, {
                title,
                item,
                prices,
                sku,
                inventory_quantity,
                origin_country,
                material,
                metadata,
                original_price,
                calculated_price,
                original_price_incl_tax,
                calculated_price_incl_tax,
                original_tax,
                calculated_tax,
                tax_rates
            });
            res.send(updated)
        } catch (e) {
            next(e)
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
            if (!id) {
                throw new ApplicationError('id is required as parameter')
            }
            const item = await services.findOne({ _id: id });
            if (!item?._id) {
                throw new ApplicationError(`user with ${id} not found`);
            }
            res.send(item)
        } catch (e) {
            next(e)
        }

    },
    delete(req: Request, res: Response) {
        res.send(req.path)
    }
}