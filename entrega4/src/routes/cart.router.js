import { Router } from "express";
import cartManager from "../managers/cartManager.js";
import { __dirname } from "../utils.js";

const router=Router();
const manager=new cartManager(`${__dirname}/files/carts.json`)


router.get('/', async (req,res)=>{

    try {
        
        const carts= await manager.getCarts()
        const queryLimit= parseInt(req.query.limit);
        if(!queryLimit){
            return res.send({status:'success', payload:carts});
        }else{
            const result= carts.filter((c)=> c.id <= queryLimit);
            return res.send({status:'success', payload:result})
        }

    } catch (error) {
        console.log(error)
    }

})

router.post('/', async (req, res)=>{

    try {
    
        const carts= await manager.getCarts()
        const id= carts.length === 0 ? 1: carts[carts.length-1].id+1;
        const cart= {products:[], id:id}
    
        await manager.addCarts(cart)
        
        
        const newCart= await manager.getCarts()

        return res.status(200).send({status:'success', payload:newCart})
    
    } catch (error) {
        console.log(error)
    }
});

router.get('/:cid', async (req,res)=>{

    try {
        
        const id=parseInt(req.params.cid);
        const carts= await manager.getCarts()
    
        const cart= await manager.getCartsById(id)
    
        if(cart === undefined){
            return res.status(400).send({status:'error', error:'cart not found'})
        }
    
        return res.status(200).send({status:'success', payload: cart})

    } catch (error) {
        console.log(error)
    }
});

router.post('/:cid/product/:pid', async (req,res)=>{

    try {

    const cartId=parseInt(req.params.cid);
    const productId= parseInt(req.params.pid);
    const cart= await manager.getCartsById(cartId);

    if(cart === undefined){
        return res.status(400).send({status:'error', error:'cart not found'})
    }

    await manager.addProducts(cartId, productId)

    const products= await manager.getCarts()

    return res.status(200).send({status:'success', payload:products })
        
    } catch (error) {
        console.log(error)
    }

})

export default router