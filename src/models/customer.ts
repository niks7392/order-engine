import mongoose, { mongo, Schema } from "mongoose";



const customerShema = new mongoose.Schema({
    // "email": "user@example.com",
    email: {
        type: String,
        unique: true
    },
    // "first_name": "Arno",
    first_name: {
        type: String,
    },
    // "last_name": "Willms",
    last_name: {
        type: String
    },
    // "billing_address_id": "addr_01G8ZH853YPY9B94857DY91YGW",
    billing_address: {
        type: Schema.Types.ObjectId,
        ref: 'billing_address'
    },
    // "billing_address": {},
    // billing_address: {
    //     type: Object
    // },
    // "shipping_addresses": [],
    shipping_addresses: [
        {
            type: Schema.Types.ObjectId,
            ref : 'shipping_address'
        }
    ],
    // "phone": 16128234334802,
    phone: {
        type: Number,
        unique: true
    },
    // "metadata": {}
    metadata: {
        type: Object
    }
}, { timestamps: true })
// "orders": [], later part


export default mongoose.model('customer', customerShema);