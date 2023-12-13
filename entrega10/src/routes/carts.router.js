import { Router } from "express";
import cartsManager from "../dao/fileManagers/managers/cartsManager.js";
import cartsDB from "../dao/dbManagers/managers/cartsManagerDB.js";
import { __dirname } from "../utils.js";

const router= Router();

const manager= new cartsManager(`${__dirname}/dao/fileManagers/files/carts.json`);
const managerDB= new cartsDB();

router.get('/', async(req,res)=>{
    try {
        const products= await manager.get();
        const productsDB= await managerDB.get();
        console.log(productsDB);
        res.status(200).send({status:'success', payload:{db:productsDB, fs:products}});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});//CHECK

router.get('/:cid', async(req,res)=>{
    const id= req.params.cid;
    try {
        const cart= await manager.getById(id);
        const cartDB= await managerDB.getById(id);
        console.log(cartDB);
        res.status(200).send({status:'success', payload:{db:cartDB, fs:cart}});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});//CHECK

router.post('/', async(req,res)=>{
    const{product, quantity}=req.body;
    try {
        const productDB= await managerDB.add(product, quantity);
        //const productFS= await manager.add(product, quantity, productDB._id); 
        res.status(201).send({status:'success', payload:productDB});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});//CHECK

router.post('/:cid/product/:pid', async(req,res)=>{
    const cartId= req.params.cid;
    const productId= req.params.pid;
    try {
        //const result=await manager.addToCart(cartId,productId);
        const resultDB=await managerDB.addProducts(cartId,productId);
        res.status(201).send({status:'success', payload:resultDB});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    }
});//CHECK

router.put('/:cid', async(req,res)=>{
    const cartId=req.params.cid;
    const {products}= req.body
    try {
        if(!products){
            return res.status(400).send({status:'error', error:'incomplete campus'});
        };
        const uptadeDB= await managerDB.uptade(cartId, products);
        res.status(200).send({status:'success', payload:uptadeDB});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});//CHECK

router.put('/:cid/products/:pid', async(req,res)=>{
    const cartId= req.params.cid;
    const productId= req.params.pid;
    const {quantity}= req.body;

    try {
        if(!quantity){
            res.status(400).send({status:'error', error:"incomplete campus"});
        };

        const uptadeDB= await managerDB.uptadeQuantity(cartId, productId, quantity);

        res.status(200).send({status:'success', payload: uptadeDB});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    }
});

router.delete('/:cid', async(req,res)=>{
    const cartId=req.params.cid;
    try {
        const resultDB= await managerDB.delete(cartId);
        //const result= await manager.delete(cartId);
        res.status(200).send({status:'success', payload:resultDB});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message}); 
    };
});

router.delete('/:cid/products/:pid', async(req,res)=>{
    const cartId= req.params.cid;
    const productId= req.params.pid;

    try {
        const result= await managerDB.deleteProduct(cartId, productId);
        res.status(200).send({status:'success', payload:result});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message}); 
    }
});


export default router;