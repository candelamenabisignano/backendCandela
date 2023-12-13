import {Router} from 'express';
import {getCarts,getCart,addCart,addToCart,uptadeCart,uptadeProductQuantity,deleteCart,deleteProductFromCart} from '../controllers/carts.controller.js';

const router= Router();

router.get('/', getCarts());
router.get('/:cid', getCart());
router.post('/', addCart());
router.post('/:cid/product/:pid', addToCart());
router.put('/:cid', uptadeCart());
router.put('/:cid/products/:pid', uptadeProductQuantity());
router.delete('/:cid', deleteCart());
router.delete('/:cid/products/:pid', deleteProductFromCart());

export default router;