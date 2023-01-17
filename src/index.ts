import express, { Application, NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import database from './config/database';
import cartRoutes from './api/cart/routes'
import customerRoutes from './api/customer/routes'
import billingRoutes from './api/billing_address/routes'
import shippingRoutes from './api/shipping_address/routes';
import itemRoutes from './api/item/routes'
import variantRoutes from './api/variant/routes'
import regionRoutes from './api/region/routes'
import orderRoutes from './api/order/routes'
import cart from './models/cart';


const port: number | any = process.env.PORT || 1337;
export const app: Application = express();
config();
database({ env: process.env });

// (
//     async function(){
//         // let carts = await cart.create({
//         //     email : 'admin@admsin.com'
//         // })
//         await cart.deleteOne({email : 'admin@admsin.com'})
//     }
// )()

app.use('/api/cart', cartRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/shipping_address', shippingRoutes);
app.use('/api/billing_address', billingRoutes);
app.use('/api/region', regionRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/variant', variantRoutes);
app.use('/api/order', orderRoutes)

// JUST FOR TEST AND ONLY RUN IT IN DEVELOPMENT
app.get('/test/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        // let itemsTotal = cart.aggregate([
        //     { "$match": { _id: new Types.ObjectId(id) } },
        //     // The following aggregation uses the $unwind stage to output a document for each element in the sizes array:
        //     // $UNWINDREF https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/
        //     { "$unwind": "$items" },
        //     {
        //         "$lookup": {
        //             // LOOKUP REF = https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/

        //             // LOOKING FOR CONNECTED COLLECTION  
        //             from: "variants",
        //             // LOOKING FOR THE FIELD THAT IS RELATING IN OUR CASE IN CARTSCHEMA FEILD ITEMS THAT IS AN ARRAY HAS ITEM WHICH CONTAINS ID THAT SAME ID BELONGS TO VARIANT  
        //             localField: "items.item", // FIELD IN CART COLLECTION
        //             // MATCHING THE LOCALFIELD SO WHERE _ID === FOREIGNFIELD WE ARE CATCHING THE ITEMS OF CART 
        //             foreignField: "_id", // FIELD IN VARIANTS COLLECTION 
        //             // FIXME:  THE PROBLEM IN THIS CASE IS WHEN WE ARE PULLING CART RELATED VARIANTS VARIANTS ARE NOT SETTLING ALONG WITH THE QUANTITY
        //             as: "added_items",
        //         }
        //     },
        //     {
        //         "$addFields" : {"items.item" : "$added_items"}
        //     }
        //     // {
        //     //     "$project" : {
        //     //         total : {
        //     //             "$sum" : {
        //     //                 "$multiply" : ["$items.quantity", "$items.item[0].original_price"]
        //     //             }
        //     //         }
        //     //     }
        //     // }
        //     // { "$unwind": "$added_items" },
        //     // {
        //     //     "$group": {
        //     //         "_id": "$_id",
        //     //         "totalOfVariants": { "$sum": { "$multiply": ["$added_items.original_price", "$items.quantity"] } }
        //     //     }
        //     // }
        // ]).exec((err: any, data: any) => {
        //     if (err) throw new ApplicationError(err.message);
        //     console.log(data[0]);
        //     // console.log(data);
        //     // if (data.length === 0 || !data) throw new ApplicationError('Not found');
        //     return res.send( data[0])
        // })
        const entity: any = await cart.findById(id).populate("items.item")
        let total: number = 0;

        let itemsTotal = entity.items.map((e: any) => {
            return total = e.quantity * e.item.original_price
        });
        total = itemsTotal.reduce((p: any, c: any) => {
            return p + c
        })
        res.send(total.toString())
    } catch (e) {
        next(e)
    }
})

app.on('ready', () => {
    app.listen(port, (): void => {
        console.log(`your typescript application running on http://localhost:${port}`);
    })
})
