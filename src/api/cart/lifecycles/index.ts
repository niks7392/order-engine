import { Cart } from "../../../types/cart";
export default {
    // for  now we are running it for get cart
    "cart.created": (payload:any) => {
        console.log(payload);
    }
}