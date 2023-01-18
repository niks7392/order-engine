import { model, Schema, Types } from "mongoose";




const orderSchema = new Schema({
    // _id: string
    // status: string
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled', 'requires_action'],
        required: true,
        deafult: 'pending'
    },
    //fulfillment_status?: string
    //payment_status?: string
    //display_id?: number
    // cart: Cart | Types.ObjectId
    cart: {
        type: Types.ObjectId,
        ref: 'cart'
    },
    // customer: Customer | Types.ObjectId
    customer: {
        type: Types.ObjectId,
        ref: 'customer'
    },
    // email: string
    email: {
        type: String,
        required: true
    },
    // billing_address: Billing_Address | Types.ObjectId
    billing_address: {
        type: Types.ObjectId,
        ref: 'billing_address'
    },
    // shipping_address: Shipping_Address | Types.ObjectId
    shipping_address: {
        type: Types.ObjectId,
        ref: 'shipping_address'
    },
    // region: Region | Types.ObjectId
    region: {
        type: Types.ObjectId,
        ref: 'region'
    },

    // currency_code: string
    currency_code: {
        type: String,
        required: true
    },

    // currency: string
    currency: {
        type: String,
        required: true
    },
    // tax_rate: number
    tax_rate: {
        type: Number
    },
    //discounts?: Discount[]
    //gift_cards?: GiftCard[]
    //payments?: Payment[]
    // items: Array<Variant | Types.ObjectId>
    items: {
        type: Array
    },
    //canceled_at?: string
    //no_notification?: boolean
    //idempotency_key?: string
    //external_id?: any
    //sales_channel_id?: any
    //sales_channel?: SalesChannel
    //shipping_total?: number
    // discount_total: number
    discount_total: {
        type: Number
    },
    // tax_total: number
    tax_total: {
        type: Number
    },
    //refunded_total?: number
    // total: number
    total: {
        type: Number,
        required: true
    },

    // subtotal: number
    subtotal: {
        type: Number
    },
    // paid_total: number
    paid_total: {
        type: Number
    },
    metadata : {
        type : Object
    }
    //refundable_amount?: number
    //gift_card_total?: number
    //gift_card_tax_total?: number
}, {timestamps:true});



export default model('order', orderSchema);