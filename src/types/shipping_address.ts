import { Types } from "mongoose";
import { Customer } from "./customer";

export type Shipping_Address = {
    _id?: Types.ObjectId | string;
    customer_id?: Types.ObjectId | string;
    customer?: Customer;
    company?: string;
    first_name?: null;
    last_name?: null;
    address_1?: null;
    address_2?: null;
    city?: null;
    country_code?: null;
    country?: string;
    province?: null;
    postal_code?: null;
    phone?: null;
    created_at?: null;
    updated_at?: null;
    metadata?: any;
};


export const testShippingData = {
    "company": "Acme",
    "first_name": "Arno",
    "last_name": "Willms",
    "address_1": "14433 Kemmer Court",
    "address_2": "Suite 369",
    "city": "South Geoffreyview",
    "country_code": "st",
    "province": "Kentucky",
    "postal_code": 72093,
    "phone": 16128234334802,
    "metadata": {}
}
