import { model, Schema } from "mongoose";


const variantSchema = new Schema({
    // title?: string
    title: {
        type: String
    },

    // product?: Types.ObjectId
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item'
    },
    // prices?: any[]
    prices: [
        {
            type: String
        }
    ],
    // sku?: string
    sku: {
        type: String,
        unique: true
    },
    // inventory_quantity?: number
    inventory_quantity: {
        type: Number
    },

    // origin_country?: any
    origin_country: {
        type: String
    },
    // material?: any
    material: {
        type: String
    },
    // metadata?: any
    metadata: {
        type: Object
    },
    // original_price?: number
    original_price: {
        type: Number
    },
    // calculated_price?: number
    calculated_price: {
        type: Number
    },
    // original_price_incl_tax?: number
    original_price_incl_tax: {
        type: Number
    },
    // calculated_price_incl_tax?: number
    calculated_price_incl_tax: {
        type: Number
    },
    // original_tax?: number
    original_tax: {
        type: Number
    },
    // calculated_tax?: number
    calculated_tax: {
        type: Number
    }
}, {timestamps:true});


export default model('variant', variantSchema);