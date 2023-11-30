import {Router} from 'express';
import { __dirname } from '../utils.js';
import cartsDB from '../dao/dbManagers/managers/cartsManagerDB.js';
import productsDB from '../dao/dbManagers/managers/productsManagerDB.js';
import passport from 'passport';
const router= Router();
const cartManagerDB= new cartsDB();
const productManagerDB= new productsDB();

const publicAccess= (req,res, next)=>{
    if(req.user != (null||undefined)){
        return res.redirect('/products') //si el usuario ya existe que vaya a ver su perfil
    }else{
        return next() //sino que se siga la ejecucion del flujo 
    };
}
const privateAccess= (req,res, next)=>{
    if(req.user == (null||undefined))return res.redirect("/login");
    return next()
}


router.get('/products',passport.authenticate('jwt', {session:false}), privateAccess, async (req,res)=>{
    const page= Number(req.query.page)||1;
    const limit= Number(req.query.limit)||10;
    const query= req.query.query;
    const queryValue= req.query.queryValue;
    const sort= req.query.sort||'asc';
    console.log(req.user)
    const{docs, hasPrevPage, hasNextPage, nextPage, prevPage}= await productManagerDB.get(query, queryValue, limit, page, sort);
    try {
        const prevLink= hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null;
        const nextLink= hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null;
        res.render('products', {products: docs, hasPrevPage, hasNextPage, nextPage, prevPage, nextLink, prevLink, user:req.user}); 
    } catch (error) {
        res.status(500).send({status:'error', error:error.message})
    }
});

router.get('/carts/:cid', async(req,res)=>{
    const cid=req.params.cid;
    try {
        const cart= await cartManagerDB.getById(cid);
        
        res.render('cart', {products:cart.products});
    } catch (error) {
        console.log(error.message);
    };
});

router.get('/register',publicAccess, async(req,res)=>{
    res.render('register');
});

router.get('/login',publicAccess, async(req,res)=>{
    res.render('login');
});


export default router