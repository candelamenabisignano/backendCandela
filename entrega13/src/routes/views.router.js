import { Router } from "express";
import {privateAccess,publicAccess,getProductsView,getCartView,getLoginView,getRegisterView, getChatView, getLoggerTest} from '../controllers/views.controller.js';
import passport from "passport";
import { getMockingProducts } from "../controllers/products.controller.js";
import toAsyncRouter from "async-express-decorator";

const router= toAsyncRouter(Router());

router.get('/products', passport.authenticate('jwt', {session:false}),privateAccess,getProductsView);
router.get('/mockingproducts', getMockingProducts);
router.get('/loggerTest', getLoggerTest);
router.get('/carts/:cid', getCartView);
router.get('/register', publicAccess, getRegisterView);
router.get('/login', publicAccess, getLoginView);
router.get('/chat',passport.authenticate('jwt', {session:false}), getChatView )

export default router;