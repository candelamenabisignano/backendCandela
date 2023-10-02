import { Router } from "express";
import cartManager from "../managers/cartManager.js";

const router=Router();
const manager=new cartManager("../src/files/carts.json")

router.get('/', async (req,res)=>{
    const carts= await manager.getCarts()
    const queryLimit= parseInt(req.query.limit);
    if(!queryLimit){
        return res.send({status:'success', payload:carts});
    }else{
        const result= carts.filter((c)=> c.id <= queryLimit);
        return res.send({status:'success', payload:result})
    }
})

router.post('/', async (req, res)=>{
    const cart=req.body;

    if(!cart.products){
        return res.status(400).send({status:'error', error:'incomplete campus'});
    }else if(!Array.isArray(cart.products)){
        return res.status(400).send({status:'error', error:'products its not an array'});
    }

    await manager.addCarts(cart)

    const carts= await manager.getCarts()

    return res.status(200).send({status:'success', payload:carts})
});

router.get('/:cid', async (req,res)=>{
    const id=parseInt(req.params.cid);
    const carts= await manager.getCarts()

    const cart= await manager.getCartsById(id)

    if(cart === undefined){
        return res.status(400).send({status:'error', error:'cart not found'})
    }

    return res.status(200).send({status:'success', payload: cart})
});

router.post('/:cid/products/:pid', async (req,res)=>{
    const cartId=parseInt(req.params.cid);
    const productId= parseInt(req.params.pid);
    const cart= await manager.getCartsById(cartId);

    if(cart === undefined){
        return res.status(400).send({status:'error', error:'cart not found'})
    }

    await manager.addProducts(cartId, productId)

    const products= await manager.getCarts()

    return res.status(200).send({status:'success', payload:products })
})

export default router