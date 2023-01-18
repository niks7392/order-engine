import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import ApplicationError from "./utils/ApplicationError";

export default {
    validateId(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            if(id && !isValidObjectId(id)){
                throw new ApplicationError(`the is must be a valid and provided id`)
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}