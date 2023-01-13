import { Request, Response } from "express";
import ApplicationError from "../../../utils/ApplicationError";
import services from "../services";

export default {
    async create(req: Request, res: Response) {
        try {
            const { email,
                first_name,
                last_name,
                phone,
                metadata } = req.body;
            const exists = await services.findOne({ email, phone });
            if (exists?._id) {
                throw new ApplicationError(`user with ${email | phone} already exists`);
            }
            const create = services.create({ email, first_name, last_name, phone, metadata });
            const created = await services.save({ email, first_name, last_name, phone, metadata });
            res.send(created)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }
    },
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { email,
                first_name,
                last_name,
                phone,
                metadata, shipping_addresses, billing_address } = req.body;
            const exists = await services.findOne({ _id: id });
            if (!exists?._id) {
                throw new ApplicationError(`user with ${email | phone} not found`);
            }
            const updated = await services.updateWithId(exists._id, { email, first_name, last_name, phone, metadata, shipping_addresses, billing_address })
            res.send(updated)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }
    },
    async find(req: Request, res: Response) {
        const { query } = req;
        return res.json(await services.find(query))
    },
    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApplicationError('id is required as parameter')
            }
            const customer = await services.findOne({ _id: id });
            if (!customer?._id) {
                throw new ApplicationError(`user with ${id} not found`);
            }
            res.send(customer)
        } catch (e) {
            console.log(e);
            return res.status(500).send('internal server error')
        }

    },
    delete(req: Request, res: Response) {
        res.send(req.path)
    }
}