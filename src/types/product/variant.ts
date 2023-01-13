import { Types } from "mongoose"



export type Variant = {
    _id?: string
    title?: string
    item?: Types.ObjectId|string
    prices?: any[]
    sku?: string
    inventory_quantity?: number
    origin_country?: any
    material?: any
    created_at?: string | Date
    updated_at?: string | Date
    deleted_at?: string | Date
    metadata?: any
    original_price?: number
    calculated_price?: number
    original_price_incl_tax?: number
    calculated_price_incl_tax?: number
    original_tax?: number
    calculated_tax?: number
    tax_rates?: any[]
}



export const testVariantData = {
    "title": "Small",
    "product": "",
    "prices": [],
    "sku": "shirt-123",
    "inventory_quantity": 100,
    "origin_country": 'india',
    "material": 'mug',
    "metadata": {
        "my":"metadat"
    },
    "original_price": 0,
    "calculated_price": 0,
    "original_price_incl_tax": 0,
    "calculated_price_incl_tax": 0,
    "original_tax": 0,
    "calculated_tax": 0,
    "tax_rates": []
}