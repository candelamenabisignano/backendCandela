import { Router } from "express";
import {privateAccess,publicAccess,getProductsView,getCartView,getLoginView,getRegisterView, getChatView} from '../controllers/views.controller.js';
import passport from "passport";

const router= Router();

router.get('/products', passport.authenticate('jwt', {session:false}),privateAccess,getProductsView);
router.get('/carts/:cid', getCartView);
router.get('/register', publicAccess, getRegisterView);
router.get('/login', publicAccess, getLoginView);
router.get('/chat',passport.authenticate('jwt', {session:false}), getChatView )

export default router;