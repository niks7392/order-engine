import { Document, MongooseError, Types } from "mongoose";
import path from "path";
import cart from "../../../models/cart";
import { Cart } from "../../../types/cart";
import ApplicationError from "../../../utils/ApplicationError";

export default {
    async findOne(payload: Cart, populate?:boolean) {
        if(populate===true){
            return await cart.findOne(payload).populate(['customer', 'shipping_address', 'billing_address', 'region', 'items.item'])
        }
        return await cart.findOne(payload);
    },
    create(payload?: Cart) {
        return new cart(payload)
    },
    async save(payload?: Cart) {
        return await cart.create(payload)
    },
    async updateWithId(_id: Types.ObjectId | string, payload: Cart) {
        return await cart.findByIdAndUpdate(_id, payload, { new: true }).populate(['customer', 'shipping_address', 'billing_address', 'region', 'items'])
    },
    async find(payload: Cart) {
        return await cart.find(payload).populate(['customer', 'shipping_address', 'billing_address', 'region'])
    },
    async validateCart(id: string | Types.ObjectId, populate?: boolean) {
        let isCart;
        if (populate) {
            isCart = await cart.findOne({ _id: id }).populate(['customer', 'shipping_address', 'billing_address', 'region'])
        } else {
            isCart = await cart.findOne({ _id: id })
        }
        if (!isCart) {
            throw new ApplicationError(`cart with ${id} Not Found`)
        }
        return isCart
    },
    // HERE WE ARE VALIDATING IF THE LINE_ID WHICH REFERES TO THE CART.ITEMS LINE ID IS EXISTS OR NOT 
    async validateLineId(cart_id:string, line_id:string){
        const isExists = await cart.findOne({_id:cart_id, "items._id" : line_id});
        if(!isExists){
            throw new ApplicationError(`item with line_id ${line_id} in cart Not Found`)
        }
        return isExists
    },
    // THIS FUNCTION HERE SHOULD ADD VARIANT AND IF EXISTS THEN ADD IT IN PREVIOUS VALUE
    async pushVariantInCart(cart_id: string, variant_id: string, quantity: number) {
        // FIND CART WITH SAME VARIANT IN IT IF EXISTS UPDATE THE QUANTITY ELSE CREATE AND ADD THE QUANTITY
        let cartWithVariantExists = await cart.findOne({ _id: cart_id, "items.item": variant_id }, async (err: MongooseError, doc: any) => {
            if (err) {
                throw new ApplicationError(err.message);
            }
            // doc.items[0].quantity=quantity
            // console.log(doc);
            // doc.items.forEach((i: any) => i.item.item === variant_id)
            // doc.isNew = true

            // await doc.save()

        }).clone()
            .catch((e: MongooseError) => { throw new ApplicationError(e.message) });
            if(cartWithVariantExists){
                await cart.updateOne({_id:cart_id, "items.item":variant_id}, {$inc:{"items.$.quantity":quantity}}).exec()
            }

        if (!cartWithVariantExists) {
            if(quantity<=0)throw new ApplicationError(`line item is not exists since null or negative values are not allowed when newly adding items`)
            return await cart.findOne({ _id: cart_id }, async (err: MongooseError, doc: any) => {
                if (err) {
                    throw new ApplicationError(err.message);
                }
                // console.log(doc);

                doc.items.push({ item: variant_id, quantity })
                // console.log(doc);
                // doc.isNew = true
                await doc.save()
            }).clone()
                .catch((e: MongooseError) => { throw new ApplicationError(e.message) });
                    }
        // else{
        //      await cart.updateOne({_id:cart_id}, {$push:{items : {item : variant_id, quantity}}});
        //      return await this.findOne({_id:cart_id}, true)
        // }
        return cartWithVariantExists
    },
    async updateVariantInCart(cart_id:string|Types.ObjectId, line_id:string|Types.ObjectId, quantity:number){
        await cart.updateOne({_id:cart_id, "items._id": line_id}, {$set:{"items.$.quantity": quantity}})
    },
    async deleteVariantInCart(cart_id:Types.ObjectId|string, line_id:Types.ObjectId|string){
        await cart.updateOne({_id:cart_id, "items._id":line_id}, {$pull:{items:{_id:line_id}}})
    },
    async ensureCartTotal(_id:string|Types.ObjectId){
        let entity:any = await cart.findById(_id).populate('items.item')
        let itemsWithTotal = this.createTotalForItems(entity.items)
        // console.log(itemsWithTotal);
        // console.log(itemsWithTotal);
        
        let grandTotal = itemsWithTotal?.reduce((prev:any, curr:any)=>{
            // console.log(prev);
            return  prev.total+ curr.total
        });
        // console.log(entity.items);
        console.log(grandTotal);
        
        // let  updated = await cart.findByIdAndUpdate(_id, {
        //     total : grandTotal
        // });
        // if(!updated){
        //     throw new ApplicationError(`error on line 103 of ${path.join(__filename, '.')}`)
        // }
    },
    createTotalForItems(items?:[]|any){
        let newItems =  items?.map((item:any)=>{
            // console.log(item.quantity);
            // console.log(item);
            return {...item, total : item.item.original_price * item.quantity }
        })
        return newItems
        
    }
}



//BELOW METHO REMOVES THE VARIANT FROM CART
        // let newc = await cart.updateOne({_id : cart_id, "items.item":variant_id}, {$pull:{items : {item:variant_id}}}, (err:MongooseError, res:any)=>{
        //     if(err)throw new ApplicationError(err.message);
        //     console.log(res);
            
        // }).clone()
        // console.log(newc);