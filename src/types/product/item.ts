import { Types } from "mongoose"
import { Variant } from "./variant";

export type Item = {
    _id?: string | Types.ObjectId
    title?: string
    subtitle?: string
    description?: string
    handle?: string
    // is_giftcard: boolean
    status?: string
    images?: any[]
    thumbnail?: string
    variants?: Array<Variant>
    origin_country?: any
    material?: string
    type?: string
    tags?: any[]
    discountable?: boolean
    created_at?: string | Date
    updated_at?: string | Date
    metadata?: any
};



export const testItemdata = {
    "title": "Medusa Coffee Mug",
    "subtitle": "string",
    "description": "Every programmer's best friend.",
    "handle": "coffee-mug",
    "status": "preview",
    "images": [],
    "thumbnail": "http://example.com",
    "variants": [],
    "origin_country": null,
    "material": null,
    "type": {},
    "tags": [],
    "discountable": true,
    "metadata": {}
}