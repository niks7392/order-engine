import mongoose, { Types } from "mongoose";

const billingAddressSchema = new mongoose.Schema({
    customer: {
        type: Types.ObjectId,
        ref: 'customer'
    },
    // customer: {
    //     type: Object
    // },
    company: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address_1: {
        type: String
    },
    address_2: {
        type: String
    },
    city: {
        type: String
    },
    country_code: {
        type: String
    },
    country: {
        type: String
    },
    province: {
        type: String
    },
    postal_code: {
        type: Number
    },
    phone: {
        type: Number,
    },
    metadata: {
        type: Object
    }
});


export default mongoose.model('billing_address', billingAddressSchema);