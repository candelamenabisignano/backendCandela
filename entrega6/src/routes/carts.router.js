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
        const productsDB= await manager.get();
        res.status(200).send({status:'success', payload:{fs:products, db:productsDB}});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    }
});

router.get('/:id', async(req,res)=>{
    const id= req.params.id;
    try {
        const product= await manager.getById(id);
        const productDB= await managerDB.getById(id);
        res.status(200).send({status:'success', payload:{fs:product, db:productDB}});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});

router.post('/', async(req,res)=>{
    const{products}=req.body;

    try {
        const productDB= await managerDB.add(products);
        const product= await manager.add({products:products}, productDB._id);
        res.status(201).send({status:'success', payload:{fs:product, db:productDB}});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
});

router.post('/:cid/product/:pid', async(req,res)=>{
    const cartId= req.params.cid;
    const productId= req.params.pid;
    try {
        await manager.addToCart(cartId,productId);
        await managerDB.addProducts(cartId,productId);
        const result= await manager.get();
        const resultDB= await managerDB.get();
        res.status(201).send({status:'success'});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    }
})

router.delete('/:cid', async(req,res)=>{
    const cartId=req.params.cid;
    try {
        const resultDB= await managerDB.delete(cartId);
        const result= await manager.delete(cartId);
        res.status(200).send({status:'success', payload:{fs:result, db:resultDB}});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message}); 
    };
});
export default router;