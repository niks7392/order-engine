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
import cart from './models/cart';
import { MongooseError } from 'mongoose';
import ApplicationError from './utils/ApplicationError';
import item from './models/item';


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

// JUST FOR TEST AND ONLY RUN IT IN DEVELOPMENT
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { items }: any = await cart.findById("63bfc11ad57b897659f399a4", (err:MongooseError,doc:any)=>{

            let arr = doc.items.map((element : any) => {
                return {...element, total : element.item.original_price * element.quantity}
            });
            console.log(arr);
            
        }).populate("items.item").clone()
        res.send('ne')
    } catch (e) {
        next(e)
    }
})

app.on('ready', () => {
    app.listen(port, (): void => {
        console.log(`your typescript application running on http://localhost:${port}`);
    })
})
