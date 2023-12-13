import { Router } from "express";
import { getProduct, getProducts, addProduct, uptadeProduct,deleteProduct } from "../controllers/products.controller.js";

const router=Router();

router.get('/', getProducts());
router.get('/:id', getProduct());
router.post('/', addProduct());
router.put('/:id', uptadeProduct());
router.delete('/:id', deleteProduct());

export default router;