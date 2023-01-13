import { Types } from "mongoose"



export type Region = {
    _id?:Types.ObjectId|string
    name?: string,
    currency_code?: string,
    countries?: Array<[]>,
    includes_taxes?: boolean,
    metadata?: any
}


export const testRegionData = {
    "name": "IN",
    "currency_code": "inr",
    "automatic_taxes": true,
    "countries": [],
    "includes_tax": true,
    "metadata": {}
}