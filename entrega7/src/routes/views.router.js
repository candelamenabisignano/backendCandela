import {Router} from 'express';
import { __dirname } from '../utils.js';
import cartsDB from '../dao/dbManagers/managers/cartsManagerDB.js';
import productsDB from '../dao/dbManagers/managers/productsManagerDB.js';
const router= Router();
const cartManagerDB= new cartsDB();
const productManagerDB= new productsDB();


router.get('/products', async (req,res)=>{
    const page= Number(req.query.page)||1;
    const limit= Number(req.query.limit)||10;
    const query= req.query.query;
    const queryValue= req.query.queryValue;
    const sort= req.query.sort||'asc';
    const{docs, hasPrevPage, hasNextPage, nextPage, prevPage}= await productManagerDB.get(query, queryValue, limit, page, sort);
    try {
        const prevLink= hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null;
        const nextLink= hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null;
        res.render('products', {products: docs, hasPrevPage, hasNextPage, nextPage, prevPage, nextLink, prevLink}); 
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/carts/:cid', async(req,res)=>{
    const cid=req.params.cid;
    try {
        const cart= await cartManagerDB.getById(cid);
        
        res.render('cart', {products:cart.products})
    } catch (error) {
        console.log(error.message)
    }
})

export default router