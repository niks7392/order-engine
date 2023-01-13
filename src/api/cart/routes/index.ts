import { json, Router } from "express";
import controllers from "../controllers";
import addLineItem from "../controllers/add-line-item";
import createCart from "../controllers/create-cart";
import getCart from "../controllers/get-cart";
import updateCart from "../controllers/update-cart";

const router: Router = Router();

// get all 
router.get('/', controllers.find);

router.get('/:id', getCart)

router.post('/', json(), createCart);

router.put('/:id', json(), updateCart);

router.delete('/:id', controllers.delete);

// ROUTE FOR ADD_LINE_ITEM
router.post('/:id/line-items',json(), addLineItem)



export default router;