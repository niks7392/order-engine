import { Types } from "mongoose";
import { Billing_Address } from "./billing_address";
import { Customer } from "./customer";
import { Variant } from "./product/variant";
import { Shipping_Address } from "./shipping_address";

export type Cart = {
    _id?: Types.ObjectId | string,
    email?: string,
    billing_address?: Types.ObjectId|string,
    shipping_address?: Types.ObjectId|string,
    items?: Array<[Variant]>,
    discounts?: Array<[]>,
    customer_id?: string,
    customer?: Customer,
    region?: any,
    country_code?: string,
    completed_at?: string | Date,
    created_at?: string | Date,
    updated_at?: string | Date,
    metadata?: any,
    discount_total?: number,
    total?: number,
    subtotal?: number,
    context?: {
        ip?: string,
        user_agent?: string|any
    }
}

// REF
//     "email": "user@example.com",
export const testCartData = {

    "shipping_address": {},
    "items": [],
    "billing_address": {},
    "discounts": [],
    "customer": {},
    "metadata": {},
    "discount_total": 800,
    "total": 8200,
    "subtotal": 8000,
};