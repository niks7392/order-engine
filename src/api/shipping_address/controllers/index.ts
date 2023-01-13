import { Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default {
    async create(req: Request, res: Response) {
        try {
            // console.log(req.body);
            const { company,
                first_name,
                last_name,
                address_1,
                address_2,
                city,
                country_code,
                province,
                postal_code,
                phone,
                metadata } = req.body;

            const create = services.create({ city, address_1, address_2, country_code, province, postal_code, company, first_name, last_name, phone, metadata });
            const created = await services.save({ city, address_1, address_2, country_code, province, postal_code, company, first_name, last_name, phone, metadata });
            res.send(created)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }
    },
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { company,
                first_name,
                last_name,
                address_1,
                address_2,
                city,
                country_code,
                province,
                postal_code,
                phone,
                metadata } = req.body;
            const exists = await services.findOne({ _id: id });
            if (!exists?._id) {
                throw new ApplicationError(`shipping_address with ${id} not found`);
            }
            const updated = await services.updateWithId(exists._id, { company, address_1, address_2, city, country_code, province, postal_code, first_name, last_name, phone, metadata });
            res.send(updated)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }
    },
    async find(req: Request, res: Response) {
        try {
            const { query } = req;
            return res.send(await services.find(query))
        } catch (e) {
            return res.status(500).send('internal server error')
        }
    },
    findOne(req: Request, res: Response) {
        res.send(req.path)
    },
    delete(req: Request, res: Response) {
        res.send(req.path)
    }
}