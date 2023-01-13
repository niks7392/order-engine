import { Types } from "mongoose";
import { Billing_Address } from "./billing_address";
import { Shipping_Address } from "./shipping_address";

export type Customer = {
    _id?: Types.ObjectId | string;
    email?: string;
    first_name?: string;
    last_name?: string;
    billing_address?: Array<Billing_Address> | Types.ObjectId;
    shipping_addresses?: Array<Shipping_Address>|Array<Types.ObjectId>;
    phone?: number;
    created_at?: string;
    updated_at?: string;
    metadata?: any;
};

export const testCustomerData ={
"email": "user@example.com",
"first_name": "Arno",
"last_name": "Willms",
"shipping_addresses": [],
"phone": 16128234334802,
"metadata": {}
}