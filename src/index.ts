import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';
import database from './config/database';
import cartRoutes from './api/cart/routes'
import customerRoutes from './api/customer/routes'
import billingRoutes from './api/billing_address/routes'
import shippingRoutes from './api/shipping_address/routes';
import itemRoutes from './api/item/routes'
import variantRoutes from './api/variant/routes'
import regionRoutes from './api/region/routes'
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
app.use('/api/variant', variantRoutes)

app.on('ready', () => {
    app.listen(port, (): void => {
        console.log(`your typescript application running on http://localhost:${port}`);
    })
})
