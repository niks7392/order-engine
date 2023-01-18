import { json, Router } from "express";
import middleware from "../../../middleware";
import controllers from "../controllers";
import getOrderByCart from "../controllers/get-order-by-cart";

const router: Router = Router();

// get all 
router.get('/', controllers.find);

router.get('/:id', controllers.findOne);

// ROUTE FOR GET ORDER BU CART_ID 
router.get('/cart/:id',middleware.validateId , getOrderByCart)

router.post('/', json(), controllers.create);

router.put('/:id', json(), controllers.update);

router.delete('/:id', controllers.delete);



export default router;