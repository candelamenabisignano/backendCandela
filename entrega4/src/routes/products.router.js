import {Router} from "express";
import productsManager from "../managers/productsManager.js";
import { __dirname } from "../utils.js";

const manager= new productsManager(`${__dirname}/files/products.json`)

const router= Router();

router.get('/', async (req, res)=>{
    try {

        const queryLimit= parseInt(req.query.limit);
        const products= await manager.getProducts()
        if(!queryLimit){
            return res.send({status:'success', payload:products});
        }else{
            const result= products.filter((p)=> p.id <= queryLimit);
            return res.send({status:'success', payload:result})
        }   

    } catch (error) {
        console.log(error) 
    }
});

router.get("/:id", async (req,res)=>{
    try {
    const id=parseInt(req.params.id);
    const productId= await manager.getProductsById(id)

    if(productId === undefined){
        return res.status(400).send({status:'error',message:`no econtramos en producto con el id ${id}` })
    }

    productId;
    return res.status(200).send({status:'success', payload:productId})
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async(req,res)=>{

    try {
    
    const product=req.body;
    const products= await manager.getProducts();

    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        return res.status(400).send({status:'error', error:'incomplete campus'});
    };

    if((typeof product.title !== "string")|| (typeof product.description !== "string")||(typeof product.code !== "string") || (typeof product.price !== "number") || (typeof product.stock !== "number") || (typeof product.category !== "string")){
        return res.status(400).send({status:'error', error:"incorrect type of information in a campus"})
    };

    const find=products.some((p)=> p.code === product.code);

    if(find){
        return res.status(400).send({status:'error', error:"the code has been already assigned"})
    }

    if(product.thumbnail){
        product.thumbnail=product.thumbnail
    }else{
        product.thumbnail=[]
    }

    product.status=true

    const addedProduct= await manager.addProducts(product);

    return res.status(200).send({status:'success', message:'product created', payload:addedProduct});

    } catch (error) {
        console.log(error)
    }
});

router.put("/:id", async (req,res)=>{
    try {
        const id=parseInt(req.params.id);
        const product={...req.body, id:id};
    
        if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || !product.category){
            return res.status(400).send({status:'error', error:'incomplete campus'});
        };
    
        if(!product.status){
            const productId= await manager.getProductsById(id);
            product.status= productId.status
        }else{
            product.status
        }
    
        await manager.uptadeProduct(id, product);
        return res.status(200).send({status:'success', payload: product}); 
    } catch (error) {
        console.log(error)
    }
});

router.delete("/:pid", async(req,res)=>{

    try {

        const id=parseInt(req.params.pid)
        const product= await manager.getProductsById(id)
    
        if(product === undefined){
            return res.status(400).send({status:'error', error:'product not found'})
        }
    
        await manager.deleteProductById(id)
    
        const products= await manager.getProducts()
    
        return res.status(200).send({status:'success', payload:products})

    } catch (error) {
        console.log(error)
    } 

});

export default router