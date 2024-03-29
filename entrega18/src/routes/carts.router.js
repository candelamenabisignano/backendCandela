import {Router} from 'express';
import {getCarts,getCart,addCart,addToCart,uptadeCart,uptadeProductQuantity,deleteCart,deleteProductFromCart, endPurchase} from '../controllers/carts.controller.js';
import passport from 'passport';
import { handlePolicies } from '../middlewares/middlewares.js';
const router= Router();
router.get('/', getCarts);
router.get('/:cid', getCart);
router.get('/:cid/purchase',passport.authenticate('jwt', {session:false}) , endPurchase);
router.post('/', addCart);
router.post('/:cid/product/:pid', passport.authenticate('jwt', {session:false}), handlePolicies('user','premium'), addToCart);
router.put('/:cid', uptadeCart);
router.put('/:cid/products/:pid', uptadeProductQuantity);
router.delete('/:cid', deleteCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
export default router;