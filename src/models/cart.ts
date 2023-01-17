import mongoose, { Schema } from "mongoose";

const cartSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'region'
    },
    country_code: {
        type: String,
    },
    billing_address: {
        type: Schema.Types.ObjectId,
        ref: 'billing_address'
    },
    // billing_address: {
    //     type: Object,
    // },
    shipping_address: {
        type: Schema.Types.ObjectId,
        ref: 'shipping_address'
    },
    // shipping_address: {
    //     type: Array,
    // },
    items: [{

        item: {
            type: Schema.Types.ObjectId, //creating relation with variants
            ref: 'variant',
        },
        quantity: {
            type: Number,
            min: 0
        }
    }],
    // items: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'variant'
    // }],
    discounts: {
        type: Array
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        // We might not need to change linked customer to cart insted we create new cart
        // immutable: true // FIXME: THIS WAS RESISTING TO POPULATE CUSTOMER AS RELATION OF A CART
    },
    // customer: {
    //     type: Object
    // },
    completed_at: {
        type: Date
    },
    metadata: {
        type: Object
    },
    discount_total: {
        type: Number
    },
    total: {
        type: Number
    },
    subtotal: {
        type: Number
    },
    context: {
        type: Object
    }


}, {
    timestamps: true,
    //  methods: {
        // way to declare  schema methods 
    //     async ensureCart() {
    //         let total: number = 0;
    //         for await (let i of this.items) {
    //             // console.log(i);
    //             const variant = await mongoose.models['variant'].findById(i.item);
    //             total += variant.original_price * this.items[i.quantity]
    //         }
    //     }
    // }
});


export default mongoose.model('cart', cartSchema)