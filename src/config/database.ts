import mongoose from "mongoose"
import { app } from ".."
import ApplicationError from "../utils/ApplicationError";

export default ({ env }: any) => {

    mongoose.connect(env['DATABASE_URI'], (err): any => {
        if (err) {
            console.log(err);
            throw new ApplicationError('cannot connect to database');
        }
        app.emit('ready');
    });
}




