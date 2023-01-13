import mongoose, { Schema } from "mongoose";



const regionSchema = new Schema({
    name: {
        type: String
    },
    // currency_code?: string,
    currency_code: {
        type: String
    },
    // autometic_taxes?: boolean,
    // countries?: Array<[]>,
    countries: [{
        type: String,
    }],
    // include_tax?: boolean,
    includes_taxes: {
        type: Boolean
    },
    // metadata?: any
    metadata: {
        type: Object
    }
}, { timestamps: true });



export default mongoose.model('region', regionSchema);