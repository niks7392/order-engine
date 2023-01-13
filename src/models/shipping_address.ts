import mongoose, { Schema } from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
    customer: {
        type: Schema.Types.ObjectId,
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
}, { timestamps: true });


export default mongoose.model('shipping_address', shippingAddressSchema);