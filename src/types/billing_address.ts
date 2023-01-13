import { Types } from "mongoose";

export type Billing_Address = {
    _id?: Types.ObjectId | string;
    customer?: Types.ObjectId | any;
    company?: string;
    first_name?: string;
    last_name?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    country_code?: string;
    country?: string;
    province?: string;
    postal_code?: number;
    phone?: number;
    created_at?: string;
    updated_at?: string;
    metadata?: any;
};

export const testBillingData = {
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

