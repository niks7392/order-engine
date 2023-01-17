import { Types } from "mongoose"
import { Billing_Address } from "./billing_address"
import { Cart } from "./cart"
import { Customer } from "./customer"
import { Variant } from "./product/variant"
import { Region } from "./region"
import { Shipping_Address } from "./shipping_address"


export type Order = {
    _id?: string|Types.ObjectId
    status?: string
    // fulfillment_status?: string
    // payment_status?: string
    // display_id?: number
    cart?: Cart | Types.ObjectId|string
    customer?: Customer | Types.ObjectId
    email?: string
    billing_address?: Billing_Address | Types.ObjectId
    shipping_address?: Shipping_Address | Types.ObjectId
    region?: Region | Types.ObjectId
    currency_code?: string
    currency?: string
    tax_rate?: number
    // discounts?: Discount[]
    // gift_cards?: GiftCard[]
    // payments?: Payment[]
    items?: Array<Variant | Types.ObjectId>
    // canceled_at?: string
    // no_notification?: boolean
    // idempotency_key?: string
    // external_id?: any
    // sales_channel_id?: any
    // sales_channel?: SalesChannel
    // shipping_total?: number
    discount_total?: number
    tax_total?: number
    // refunded_total?: number
    total?: number
    subtotal?: number
    paid_total?: number
    metadata ?: any
    // refundable_amount?: number
    // gift_card_total?: number
    // gift_card_tax_total?: number
}