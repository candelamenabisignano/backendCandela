import {getCartsService,getCartService,addCartService,addToCartService,uptadeCartService,uptadeProductQuantityService,deleteCartService,deleteProductFromCartService, endPurchaseService} from '../services/carts.service.js';
import { getProductService } from '../services/products.service.js';

const getCarts=async(req,res)=>{
    try {
        const carts= await getCartsService();
        res.status(200).send({status:'success', payload:carts});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const getCart=async(req,res)=>{
    const id= req.params.cid;
    try {
        const cart= await getCartService(id);
        res.status(200).send({status:'success', payload:cart});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const addCart=async(req,res)=>{
    const{product, quantity}=req.body;
    try {

        if(!product || !quantity ) return res.status(400).send({status:"error", error:"campus incomplete"})
        const cart= await addCartService(product, quantity);
        res.status(201).send({status:'success', payload:cart});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const addToCart=async(req,res)=>{
    const cartId= req.params.cid;
    const productId= req.params.pid;
    try {
        const cart=await addToCartService(cartId,productId);
        res.status(201).send({status:'success', payload:cart});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const uptadeCart=async(req,res)=>{
    const cartId=req.params.cid;
    const {products}= req.body
    try {
        if(!products){
            return res.status(400).send({status:'error', error:'incomplete campus'});
        };
        const cart= await uptadeCartService(cartId, {...req.body,id:cartId});
        res.status(200).send({status:'success', payload:cart});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const uptadeProductQuantity=async(req,res)=>{
    const cartId= req.params.cid;
    const productId= req.params.pid;
    const {quantity}= req.body;

    try {
        if(!quantity){
            res.status(400).send({status:'error', error:"incomplete campus"});
        };

        const cart= await uptadeProductQuantityService(cartId, productId, quantity);
        res.status(200).send({status:'success', payload: cart});

    } catch (error) {
        res.status(400).send({status:'error', error:error.message});
    };
};

const deleteCart= async(req,res)=>{
    const cartId=req.params.cid;
    try {
        const cart= await deleteCartService(cartId);
        res.status(200).send({status:'success', payload:cart});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message}); 
    };
};

const deleteProductFromCart= async(req,res)=>{
    const cartId= req.params.cid;
    const productId= req.params.pid;

    try {
        const cart= await deleteProductFromCartService(cartId, productId);
        res.status(200).send({status:'success', payload:cart});
    } catch (error) {
        res.status(400).send({status:'error', error:error.message}); 
    };
};

const endPurchase = async(req,res)=>{
    const {cid}= req.params;
    try {
        const purchase= await endPurchaseService(cid,req.user);
        console.log(purchase)
        return res.send({status:'success', payload:purchase})
    } catch (error) {
        return res.status(400).send({status:'error', error:error.message}); 
    }
}

export{
    getCarts,
    getCart,
    addCart,
    addToCart,
    uptadeCart,
    uptadeProductQuantity,
    deleteCart,
    deleteProductFromCart,
    endPurchase
};