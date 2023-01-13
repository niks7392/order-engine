import { json, Router } from "express";
import controllers from "../controllers";

const router: Router = Router();

// get all 
router.get('/', controllers.find);

router.get('/:id', controllers.findOne)

router.post('/',json(), controllers.create);

router.put('/:id',json(), controllers.update);

router.delete('/:id', controllers.delete);



export default router;