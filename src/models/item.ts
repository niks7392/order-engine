import { model, Schema } from "mongoose";



const itemSchema = new Schema({
    // title?: string
    title: {
        type: String
    },
    // subtitle?: string
    subtitle: {
        type: String
    },
    // description?: string
    description: {
        type: String
    },
    // handle?: string
    handle: {
        type: String,
        unique: true
    },
    // is_giftcard: boolean
    status: {
        type: String,
        enum: ['preview', 'live']
    },

    // images?: any[]
    images: [{
        type: String,

    }],
    // thumbnail?: string
    thumbnail: {
        type: String
    },
    // variants?: any[]
    variants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'variant'
        }
    ],
    // origin_country?: any
    origin_country: {
        type: String
    },
    // material?: string
    material: {
        type: String
    },
    // type?: string
    type: {
        type: String
    },
    // tags?: any[]
    tags: [
        {
            type: String
        }
    ],
    // discountable?: boolean
    discountable: {
        type: Boolean,
    },
    metadata: {
        type: Object
    }
}, { timestamps: true });




export default model('item', itemSchema)