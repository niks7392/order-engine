import { json, Router } from "express";
import controllers from "../controllers";
import addLineItem from "../controllers/add-line-item";
import completeCart from "../controllers/complete-cart";
import createCart from "../controllers/create-cart";
import deleteLineItem from "../controllers/delete-line-item";
import getCart from "../controllers/get-cart";
import updateCart from "../controllers/update-cart";
import updateLineItem from "../controllers/update-line-item";

const router: Router = Router();

// get all 
router.get('/', controllers.find);

router.get('/:id', getCart)

router.post('/', json(), createCart);

router.put('/:id', json(), updateCart);

router.delete('/:id', controllers.delete);

// ROUTE FOR ADD_LINE_ITEM REQUIRES VARIANR_ID AND QUANTITY IF EXISTS THEN INCREMENTS IT WITH CURRENT + NEW
router.post('/:id/line-items', json(), addLineItem);

// ROUTE FOR UPDATE_LINE_ITEM REQUIRES LINE_ITEM_ID AS PARAMETER AND QUANTITY IN REQ.BODY UPDATES CURRENT ITEM QTY BY GIVEN QTY
router.post('/:id/line-items/:line_id', json(), updateLineItem);

// ROUTE THAT DELETES THE LINE_ITEM FROM THE CART COMPLETELY
router.delete('/:id/line-items/:line_id', deleteLineItem);

// ROUTE FOR COMPLETING THEE CART;
router.post('/:id/complete', json(), completeCart)

export default router;