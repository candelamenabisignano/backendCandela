import { Router } from "express";
import { getProduct, getProducts, addProduct, uptadeProduct,deleteProduct, handlePolicies } from "../controllers/products.controller.js";
import passport from "passport";
const router=Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', passport.authenticate('jwt', {session:false}),handlePolicies('admin'), addProduct);
router.put('/:id',passport.authenticate('jwt', {session:false}) ,handlePolicies('admin'), uptadeProduct);
router.delete('/:id', passport.authenticate('jwt', {session:false}),handlePolicies('admin'), deleteProduct);

export default router;